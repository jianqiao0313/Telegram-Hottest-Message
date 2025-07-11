import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import { NormalizedPackageJson, readPackage } from 'read-pkg';
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from '@inquirer/input';
import { exit } from "process";
import { Dialog } from "telegram/tl/custom/dialog";
import { sleep } from "telegram/Helpers";

const program = new Command();
const maxMessages = 10000;

const commander = async (packageJson: NormalizedPackageJson) => {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync(packageJson.name, {
        font: "Calvin S",
        width: 80,
      })
    )
  );
  program
    .name('thm')
    .description(packageJson.description || '')
    .option('-I, --apiId <string>', 'apiId', '2040')
    .option('-H, --apiHash <string>', 'apiHash', 'b18441a1ff607e10a989891a5462e627')
    .option('-S, --session <string>', 'session (not bot session)', '')
    .helpOption("-h, --help", "help for command")
    .version(packageJson.version)

  program.parse();
  const options: TCommandOptions = program.opts();
  checkOptions(options);
  return options;
};

const checkOptions = (options: TCommandOptions) => {
  if (options.apiId === '2040' && options.apiHash === 'b18441a1ff607e10a989891a5462e627' && !options.session) {
    console.error(chalk.blue('未输入 apiId、apiHash 或 session，使用默认apiId、apiHash。'));
  }
}

const run = async (options: TCommandOptions) => {
  console.log(chalk.green('Running with options:'), options);
  const client = await login(options);
  const dialog = await getDialogsList(client);
  const messages = await getMessagesList(client, dialog);
  const sortedMessages = sortMessageList(messages);
  await forWardTopMessage(sortedMessages, 100);
  console.log(chalk.yellowBright('所有操作完成！'));
}

const login = async (options: TCommandOptions) => {
  console.log(chalk.green('开始登录...'));
  const client = new TelegramClient(new StringSession(options.session), +options.apiId, options.apiHash, {
    connectionRetries: 5,
    proxy: {
      ip: '127.0.0.1',
      port: 7890,
      socksType: 5,
    }
  });
  await client.connect();
  if (!await client.checkAuthorization()) {
    await client.start({
      phoneNumber: async () => await input({ message: "Please enter your number: " }),
      password: async () => await input({ message: "Please enter your password: " }),
      phoneCode: async () =>
        await input({ message: "Please enter the code you received: " }),
      onError: (err) => console.log(chalk.red(err)),
    });
  }
  console.log(chalk.green('登录成功！'));
  console.log(chalk.yellow('Your session string is:'), client.session.save());
  return client;
}

const getDialogsList = async (client: TelegramClient) => {
  console.log(chalk.green('获取对话列表...'));
  const dialogs = await client.getDialogs();
  dialogs.forEach((dialog, index) => {
    console.log(chalk.green(`[${index}]`), `名称: ${dialog.name}`);
  });
  const index = await input({ message: "请输入序号来选择获取的频道: " });
  if (dialogs[+index]) {
    return dialogs[+index];
  }
  exit(1);
}

const getMessagesList = async (client: TelegramClient, dialog: Dialog) => {
  const messagesList = [];
  let offsetId: number | undefined = undefined;
  while (true) {
    const messages = await _getMessage(client, dialog, offsetId);
    messagesList.push(...messages);
    offsetId = messages[messages.length - 1].id;
    console.log(chalk.green(`获取到 ${messages.length} 条消息，当前偏移ID: ${offsetId}`));
    if (messages.length < 2000 || messagesList.length > maxMessages) {
      break;
    }
    await sleep(30 * 1000); // 每次获取2000条消息，间隔30秒
  }
  return messagesList;
}

const _getMessage = async (client: TelegramClient, dialog: Dialog, offsetId?: number) => {
  return await client.getMessages(dialog.entity, {
    limit: 2000,
    offsetId,
  });
}

const sortMessageList = (messagesList: any[]) => {
  messagesList.forEach(item => {
    let reactionsCount = 0;
    if (item.reactions && item.reactions.results) {
      item.reactions.results.forEach((_reaction: Api.TypeReactionCount) => {
        reactionsCount += _reaction.count;
      });
    }
    item.reactionsCount = reactionsCount;
  })
  return messagesList.sort((a, b) => b.reactionsCount - a.reactionsCount);
}

const forWardTopMessage = async (messageList: Api.Message[], top = 100) => {
  console.log(chalk.green(`转发前 ${top} 条消息...`));
  const topMessages = messageList.slice(0, top);
  for (const message of topMessages) {
    try {
      await message.forwardTo('me');
      console.log(chalk.blue(`已转发消息 ID: ${message.id}`));
    } catch (error) {
      console.error(chalk.red(`转发消息 ID: ${message.id} 失败: `), error);
    }
  }
  console.log(chalk.green('转发完成！'));
}

const main = async () => {
  const packageJson = await readPackage();
  const options = await commander(packageJson)
  await run(options);
}

main();