import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";
import { Dialog } from "telegram/tl/custom/dialog";
import { sleep } from "telegram/Helpers";
import { MessageWithReactionsCount, TCommandOptions } from "./type";
import { LIMIT_PER_REQUEST, SLEEP_TIME } from './constant';

const getMessagesList = async (client: TelegramClient, dialog: Dialog, options: TCommandOptions) => {
  const messagesList = [];
  let offsetId: number | undefined = undefined;
  while (true) {
    const messages = await _getMessage(client, dialog, offsetId);
    messagesList.push(...messages);
    offsetId = messages[messages.length - 1].id;
    console.log(chalk.green(`获取到 ${messages.length} 条消息，当前偏移ID: ${offsetId}，总计消息数: ${messagesList.length}`));
    if (messages.length < 2000 || messagesList.length > +options.maxMessages) {
      break;
    }
    await sleep(SLEEP_TIME);
  }
  return messagesList;
}

const _getMessage = async (client: TelegramClient, dialog: Dialog, offsetId?: number) => {
  return await client.getMessages(dialog.entity, {
    limit: LIMIT_PER_REQUEST,
    offsetId,
  });
}

const sortMessageList = (messagesList: Api.Message[]) => {
  const sortedMessages: MessageWithReactionsCount[] = messagesList.map((item) => {
    let reactionsCount = 0;
    if (item.reactions && item.reactions.results) {
      item.reactions.results.forEach((_reaction: Api.TypeReactionCount) => {
        reactionsCount += _reaction.count;
      });
    }
    (item as MessageWithReactionsCount)['reactionsCount'] = reactionsCount;
    return item;
  })
  return sortedMessages.sort((a, b) => {
    return (b.reactionsCount || 0) - (a.reactionsCount || 0)
  });
}

export { getMessagesList, sortMessageList };
