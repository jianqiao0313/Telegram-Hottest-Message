import chalk from 'chalk';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from '@inquirer/input';
import { TCommandOptions } from "./type";
import { ProxyInterface } from 'telegram/network/connection/TCPMTProxy';

const parseProxy = (proxyConfig: string): ProxyInterface => {
  let url: URL;
  try {
    url = new URL(proxyConfig);
  } catch {
    throw new Error(`invalid proxy url: ${proxyConfig}`);
  }
  if (url.protocol !== 'socks5:' && url.protocol !== 'socks4:') {
    throw new Error(`unsupported proxy protocol "${url.protocol}", only socks4:// and socks5:// are supported.`);
  }
  if (!url.port) {
    throw new Error(`proxy port is required: ${proxyConfig}`);
  }
  return {
    ip: url.hostname.replace(/^\[|\]$/g, ''),
    port: +url.port,
    socksType: url.protocol === 'socks5:' ? 5 : 4,
    username: url.username ? decodeURIComponent(url.username) : undefined,
    password: url.password ? decodeURIComponent(url.password) : undefined,
  };
}

const login = async (options: TCommandOptions) => {
  console.log(chalk.green('start login...'));
  const proxy = options.proxy ? parseProxy(options.proxy) : undefined;
  const client = new TelegramClient(new StringSession(options.session), options.apiId, options.apiHash, {
    connectionRetries: 5,
    floodSleepThreshold: 120, // FLOOD_WAIT 不超过 120s 时自动等待重试
    proxy,
  });
  await client.connect();
  if (!await client.checkAuthorization()) {
    await client.start({
      phoneNumber: async () => await input({ message: chalk.blue("Please enter your number: ") }),
      password: async () => await input({ message: chalk.blue("Please enter your password: ") }),
      phoneCode: async () =>
        await input({ message: chalk.blue("Please enter the code you received: ") }),
      onError: (err) => console.log(chalk.red(err)),
    });
  }
  console.log(chalk.green('login success!'));
  if (!options.session) {
    console.log(chalk.yellowBright('Your session string is (save it and pass via -S to skip login next time):'), client.session.save());
  }
  return client;
}

export default login;
