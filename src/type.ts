import { Api } from "telegram";

export interface TCommandOptions {
  /**
   * The API ID for the Telegram application.
   * This is required for connecting to the Telegram API.
   */
  apiId: number;
  /**
   * The API hash for the Telegram application.
   * This is required for connecting to the Telegram API.
   */
  apiHash: string;
  /**
   * The session string for the Telegram application.
   * This is required for connecting to the Telegram API.
   */
  session: string;
  /**
   * The maximum number of messages to fetch.
   * Default is 100000.
   */
  maxMessages: number;
  /**
   * The number of top messages to forward.
   * Default is 100.
   */
  top: number;
  /**
   * The offset ID for messages.
   * This is used to fetch messages starting from a specific ID.
   */
  offsetId?: number;
  /**
   * The socks proxy URL to use for the connection.
   * e.g. 'socks5://user:pass@127.0.0.1:7890'. Empty means no proxy.
   */
  proxy: string;
  /**
   * The chat to forward messages to.
   * Default is 'me'.
   */
  forward: string;
  /**
   * Only fetch messages newer than this date.
   * e.g. '7d' for 7 days ago, or '2024-01-01' for an absolute date.
   */
  since?: Date;
  /**
   * Only fetch messages older than this date.
   * e.g. '2024-12-31'.
   */
  until?: Date;
}

export type MessageWithReactionsCount = Api.Message & { reactionsCount?: number };
