import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";
import { Dialog } from "telegram/tl/custom/dialog";
import { TCommandOptions } from './type';
import { FORWARD_LIMIT_PER_REQUEST } from './constant';

const forwardTopMessages = async (client: TelegramClient, messageList: Api.Message[], dialog: Dialog, options: TCommandOptions) => {
  const { forward } = options;
  const channelName = dialog.name || '';
  const topMessages = messageList.slice(0, options.top);
  console.log(chalk.green(`forward top ${topMessages.length} messages...`));
  await client.sendMessage(forward, { message: `[THM] ${(new Date).toLocaleString()} start forward top ${topMessages.length} messages from ${channelName}...` });
  for (let i = 0; i < topMessages.length; i += FORWARD_LIMIT_PER_REQUEST) {
    await client.forwardMessages(forward, {
      messages: topMessages.slice(i, i + FORWARD_LIMIT_PER_REQUEST),
      fromPeer: dialog.inputEntity,
    });
  }
  await client.sendMessage(forward, { message: `[THM] ${(new Date).toLocaleString()} end forward top ${topMessages.length} messages from ${channelName}.` });
  console.log(chalk.green('forward complete!'));
}

export default forwardTopMessages;
