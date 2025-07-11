import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";

const forWardTopMessage = async (client: TelegramClient, messageList: Api.Message[], channelname = '', top: string) => {
  console.log(chalk.green(`转发前 ${top} 条消息...`));
  const topMessages = messageList.slice(0, +top);
  await client.forwardMessages('me', { messages: topMessages, fromPeer: channelname });
  console.log(chalk.green('转发完成！'));
}

export default forWardTopMessage;