import { Command, InvalidArgumentError } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import { TCommandOptions } from "./type";
import { DEFAULT_API_ID, DEFAULT_API_HASH } from "./constant";

const program = new Command();

type TPackageJson = {
  name: string;
  description?: string;
  version: string;
};

const parsePositiveInt = (value: string) => {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed) || parseInt(trimmed, 10) <= 0) {
    throw new InvalidArgumentError('must be a positive integer.');
  }
  return parseInt(trimmed, 10);
};

const commander = async (packageJson: TPackageJson) => {
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
    .option('-I, --apiId <number>', 'apiId', parsePositiveInt, DEFAULT_API_ID)
    .option('-H, --apiHash <string>', 'apiHash', DEFAULT_API_HASH)
    .option('-S, --session <string>', 'session (not bot session)', '')
    .option('-M, --maxMessages <number>', 'max messages to fetch', parsePositiveInt, 100000)
    .option('-T, --top <number>', 'top messages to forward', parsePositiveInt, 100)
    .option('-O, --offsetId <number>', 'offset id for messages', parsePositiveInt)
    .option('-P, --proxy <string>', 'proxy url (e.g. socks5://[user:pass@]127.0.0.1:7890)', '')
    .option('-F, --forward <string>', 'forward hottest messages to a specific chat', 'me')
    .helpOption("-h, --help", "help for command")
    .version(packageJson.version)

  program.parse();
  const options: TCommandOptions = program.opts();
  checkOptions(options);
  return options;
};

const checkOptions = (options: TCommandOptions) => {
  if (options.apiId === DEFAULT_API_ID && options.apiHash === DEFAULT_API_HASH) {
    console.warn(chalk.yellow("Warning: using the built-in default apiId/apiHash (Telegram Desktop's public credentials), which may violate Telegram ToS and risks account limitation. Consider creating your own at https://my.telegram.org and passing them via -I/-H."));
  }
}

export default commander;
