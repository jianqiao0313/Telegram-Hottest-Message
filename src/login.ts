import chalk from 'chalk';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from '@inquirer/input';
import { TCommandOptions } from "./type";

const login = async (options: TCommandOptions) => {
  console.log(chalk.green('开始登录...'));
  const client = new TelegramClient(new StringSession(options.session), +options.apiId, options.apiHash, {
    connectionRetries: 5,
    proxy: {
      ip: '127.0.0.1',
      port: 7890,
      socksType: 5,
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
  console.log(chalk.green('登录成功！'));
  console.log(chalk.yellow('Your session string is:'), client.session.save());
  return client;
}

export default login;