import chalk from 'chalk';
import { TelegramClient } from "telegram";
import input from '@inquirer/input';

const getDialogsList = async (client: TelegramClient) => {
  console.log(chalk.green('get dialogs...'));
  const dialogs = await client.getDialogs();
  if (dialogs.length === 0) {
    throw new Error('no dialogs found for this account.');
  }
  dialogs.forEach((dialog, index) => {
    console.log(chalk.yellow(`[${index}]`), 'name: ', chalk.green(dialog.name), 'latest message id: ', chalk.green(dialog.message?.id));
  });
  const answer = await input({
    message: chalk.blue(`please enter the index of the dialog you want to select (0-${dialogs.length - 1}): `),
    validate: (value) => {
      const trimmed = value.trim();
      if (!/^\d+$/.test(trimmed) || !dialogs[Number(trimmed)]) {
        return `please enter a valid index between 0 and ${dialogs.length - 1}`;
      }
      return true;
    },
  });
  return dialogs[Number(answer.trim())];
}

export default getDialogsList;
