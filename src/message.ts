import chalk from 'chalk';
import { Api, TelegramClient } from "telegram";
import { Dialog } from "telegram/tl/custom/dialog";
import { MessageWithReactionsCount, TCommandOptions } from "./type";
import { LIMIT_PER_REQUEST } from './constant';

const getMessagesList = async (client: TelegramClient, dialog: Dialog, options: TCommandOptions) => {
  const messagesList: Api.Message[] = [];
  let offsetId: number | undefined = options.offsetId;
  const sinceTs = options.since ? Math.floor(options.since.getTime() / 1000) : undefined;
  const untilTs = options.until ? Math.floor(options.until.getTime() / 1000) : undefined;
  while (true) {
    const messages = await _getMessage(client, dialog, offsetId);
    if (!messages || messages.length === 0) {
      console.log(chalk.yellow('No more messages found or an error occurred.'));
      break;
    }
    // Filter messages within [sinceTs, untilTs]
    const filtered = messages.filter((m: Api.Message) => {
      if (!m.date) return false;
      if (untilTs && m.date > untilTs) return false;
      if (sinceTs && m.date < sinceTs) return false;
      return true;
    });
    filtered.forEach((m: Api.Message) => messagesList.push(m));
    offsetId = messages[messages.length - 1].id;
    console.log(chalk.green(`get ${filtered.length} messages (filtered from ${messages.length}), current offset ID: ${offsetId}, total messages: ${messagesList.length}`));
    if (messages.length < LIMIT_PER_REQUEST || messagesList.length >= options.maxMessages) {
      break;
    }
    // Stop if the oldest message in this batch is older than sinceTs
    if (sinceTs) {
      const oldestMsg = messages[messages.length - 1];
      if (oldestMsg.date && oldestMsg.date < sinceTs) {
        break;
      }
    }
  }
  return messagesList.slice(0, options.maxMessages);
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
