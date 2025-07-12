import chalk from 'chalk';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from '@inquirer/input';
import { TCommandOptions } from "./type";

const login = async (options: TCommandOptions) => {
  console.log(chalk.green('start login...'));
  // 处理proxy
  const proxyConfig = options.proxy;
  const socksType = proxyConfig.startsWith('socks5://') ? 5 : 4;
  const proxyUrl = proxyConfig.replace(/socks5?:\/\//, '');
  // [user, pass, ip, port] or [ip, port]
  const proxySplitArr = proxyUrl.split(/[:@]/);
  const client = new TelegramClient(new StringSession(options.session), +options.apiId, options.apiHash, {
    connectionRetries: 5,
    proxy: {
      ip: proxySplitArr[proxySplitArr.length - 2],
      port: +proxySplitArr[proxySplitArr.length - 1],
      socksType,
      username: proxySplitArr[proxySplitArr.length - 4],
      password: proxySplitArr[proxySplitArr.length - 3],
    }
  });
  await client.connect();
  if (!await client.checkAuthorization()) {
    await client.start({
      phoneNumber: async () => await input({ message: "Please enter your number: " }),
      password: async () => await input({ message: "Please enter your password: " }),
      phoneCode: async () =>
        await input({ message: "Please enter the code you received: " }),
      onError: (err) => console.log(chalk.red(err)),
    });
  }
  console.log(chalk.green('login success!'));
  console.log(chalk.yellowBright('Your session string is:'), client.session.save());
  return client;
}

export default login;