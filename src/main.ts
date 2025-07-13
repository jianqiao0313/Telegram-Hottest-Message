import chalk from 'chalk';
import { TCommandOptions } from "./type";
import commander from './commander';
import getDialogsList from './dialogs';
import { getMessagesList, sortMessageList } from './message';
import login from './login';
import forWardTopMessage from './forward';
import { exit } from 'process';
import * as packageJson from "../package.json"

const run = async (options: TCommandOptions) => {
  console.log(chalk.green('Running with options:'), options);
  const client = await login(options);
  const dialog = await getDialogsList(client);
  const messages = await getMessagesList(client, dialog, options);
  const sortedMessages = sortMessageList(messages);
  await forWardTopMessage(client, sortedMessages, dialog.name, options.top, options);
  console.log(chalk.yellowBright('Process completed successfully!'));
}

const main = async () => {
  const options = await commander(packageJson)
  await run(options);
  exit(0);
}

export default main;
