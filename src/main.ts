import chalk from 'chalk';
import { readPackage } from 'read-pkg';
import { Api, TelegramClient } from "telegram";
import { TCommandOptions } from "./type";
import commander from './commander';
import getDialogsList from './dialogs';
import { getMessagesList, sortMessageList } from './message';
import login from './login';
import forWardTopMessage from './forward';

const run = async (options: TCommandOptions) => {
  console.log(chalk.green('Running with options:'), options);
  const client = await login(options);
  const dialog = await getDialogsList(client);
  const messages = await getMessagesList(client, dialog, options);
  const sortedMessages = sortMessageList(messages);
  await forWardTopMessage(client, sortedMessages, dialog.name, options.top);
  console.log(chalk.yellowBright('所有操作完成！'));
}

const main = async () => {
  const packageJson = await readPackage();
  const options = await commander(packageJson)
  await run(options);
}

export default main;
