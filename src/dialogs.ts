import chalk from 'chalk';
import { TelegramClient } from "telegram";
import input from '@inquirer/input';
import { exit } from "process";

const getDialogsList = async (client: TelegramClient) => {
  console.log(chalk.green('获取对话列表...'));
  const dialogs = await client.getDialogs();
  dialogs.forEach((dialog, index) => {
    console.log(chalk.yellow(`[${index}]`), '名称: ', chalk.green(dialog.name), '预估条数：', chalk.green(dialog.message?.id));
  });
  const index = await input({ message: "请输入序号来选择获取的频道: " });
  if (dialogs[+index]) {
    return dialogs[+index];
  }
  exit(1);
}

export default getDialogsList;
