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
  // Use `since` as offsetDate to start fetching from that date
  let offsetDate: number | undefined = sinceTs;
  while (true) {
    const messages = await _getMessage(client, dialog, offsetId, offsetDate);
    if (!messages || messages.length === 0) {
      console.log(chalk.yellow('No more messages found or an error occurred.'));
      break;
    }
    // Filter out messages newer than `until`
    let pageMessages = messages;
    if (untilTs) {
      pageMessages = messages.filter((m: Api.Message) => !m.date || m.date <= untilTs);
    }
    // Check if we've crossed the `since` boundary
    const hasCrossedSince = sinceTs !== undefined && pageMessages.some((m: Api.Message) => m.date && m.date < sinceTs);
    pageMessages.forEach((m: Api.Message) => messagesList.push(m));
    offsetId = pageMessages[pageMessages.length - 1].id;
    // Update offsetDate to the oldest message timestamp in this batch
    const oldestMsg = pageMessages[pageMessages.length - 1];
    if (oldestMsg.date) {
      offsetDate = oldestMsg.date;
    }
    console.log(chalk.green(`get ${pageMessages.length} messages, current offset ID: ${offsetId}, total messages: ${messagesList.length}`));
    if (pageMessages.length < LIMIT_PER_REQUEST || messagesList.length >= options.maxMessages || hasCrossedSince) {
      break;
    }
  }
  return messagesList.slice(0, options.maxMessages);
}

const _getMessage = async (client: TelegramClient, dialog: Dialog, offsetId?: number, offsetDate?: number) => {
  return await client.getMessages(dialog.entity, {
    limit: LIMIT_PER_REQUEST,
    offsetId,
    offsetDate,
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
