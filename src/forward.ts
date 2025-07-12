import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";
import { TCommandOptions } from './type';

const forWardTopMessage = async (client: TelegramClient, messageList: Api.Message[], channelname = '', top: string, options: TCommandOptions) => {
  console.log(chalk.green(`forward ${top} messages...`));
  const topMessages = messageList.slice(0, +top);
  await client.sendMessage(options.forward, { message: `[THM] ${(new Date).toLocaleString()} start forward top ${top} messages from ${channelname}...` });
  await client.forwardMessages(options.forward, { messages: topMessages, fromPeer: channelname });
  await client.sendMessage(options.forward, { message: `[THM] ${(new Date).toLocaleString()} end forward top ${top} messages from ${channelname}.` });
  console.log(chalk.green('forward complete!'));
}

export default forWardTopMessage;