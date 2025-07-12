import { Api } from "telegram";

export interface TCommandOptions {
  /**
   * The API ID for the Telegram application.
   * This is required for connecting to the Telegram API.
   */
  apiId: string;
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
  maxMessages: string;
  /**
   * The number of top messages to forward.
   * Default is 10.
   */
  top: string;
  /**
   * The offset ID for messages.
   * This is used to fetch messages starting from a specific ID.
   */
  offsetId?: string;
  /**
   * The proxy URL to use for the connection.
   * Default is 'socks5://127.0.0.1:7890'.
   */
  proxy: string;
  /**
   * The chat to forward messages to.
   * Default is 'me'.
   */
  forward: string;
}

export type MessageWithReactionsCount = Api.Message & { reactionsCount?: number };
