import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import { NormalizedPackageJson, readPackage } from 'read-pkg';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from '@inquirer/input'; 

const program = new Command();

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

const main = async () => {
  const packageJson = await readPackage();
  const options = await commander(packageJson)
  await run(options);
}

main();