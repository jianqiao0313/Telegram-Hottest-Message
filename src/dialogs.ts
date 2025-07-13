import chalk from 'chalk';
import { TelegramClient } from "telegram";
import input from '@inquirer/input';
import { exit } from "process";

const getDialogsList = async (client: TelegramClient) => {
  console.log(chalk.green('get dialogs...'));
  const dialogs = await client.getDialogs();
  dialogs.forEach((dialog, index) => {
    console.log(chalk.yellow(`[${index}]`), 'name: ', chalk.green(dialog.name), 'estimated messages: ', chalk.green(dialog.message?.id));
  });
  const index = await input({ message: chalk.blue("please enter the index of the dialog you want to select: ") });
  if (dialogs[+index]) {
    return dialogs[+index];
  }
  exit(1);
}

export default getDialogsList;
