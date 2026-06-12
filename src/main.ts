import chalk from 'chalk';
import { TCommandOptions } from "./type";
import commander from './commander';
import getDialogsList from './dialogs';
import { getMessagesList, sortMessageList } from './message';
import login from './login';
import forwardTopMessages from './forward';
import { exit } from 'process';
import * as packageJson from "../package.json"

// session/apiHash/proxy 密码不落终端
const maskOptions = (options: TCommandOptions) => ({
  ...options,
  apiHash: options.apiHash ? '******' : '',
  session: options.session ? '******' : '',
  proxy: options.proxy.replace(/\/\/[^@]*@/, '//******@'),
});

const run = async (options: TCommandOptions) => {
  console.log(chalk.green('Running with options:'), maskOptions(options));
  const client = await login(options);
  try {
    const dialog = await getDialogsList(client);
    const messages = await getMessagesList(client, dialog, options);
    const sortedMessages = sortMessageList(messages);
    await forwardTopMessages(client, sortedMessages, dialog, options);
    console.log(chalk.yellowBright('Process completed successfully!'));
  } finally {
    await client.disconnect();
  }
}

const main = async () => {
  try {
    const options = await commander(packageJson);
    await run(options);
  } catch (err) {
    console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
    exit(1);
  }
  exit(0);
}

export default main;
