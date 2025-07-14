import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";
import { Dialog } from "telegram/tl/custom/dialog";
import { MessageWithReactionsCount, TCommandOptions } from "./type";
import { LIMIT_PER_REQUEST } from './constant';

const getMessagesList = async (client: TelegramClient, dialog: Dialog, options: TCommandOptions) => {
  const messagesList = [];
  let offsetId: number | undefined = options.offsetId ? +options.offsetId : undefined;
  while (true) {
    const messages = await _getMessage(client, dialog, offsetId);
    if (!messages || messages.length === 0) {
      console.log(chalk.yellow('No more messages found or an error occurred.'));
      break;
    }
    messagesList.push(...messages);
    offsetId = messages[messages.length - 1].id;
    console.log(chalk.green(`get ${messages.length} messages, current offset ID: ${offsetId}, total messages: ${messagesList.length}`));
    if (messages.length < LIMIT_PER_REQUEST || messagesList.length > +options.maxMessages) {
      break;
    }
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
