import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import { NormalizedPackageJson } from 'read-pkg';
import { TCommandOptions } from "./type";
import { exit } from "process";

const program = new Command();

const commander = async (packageJson: { [key: string]: any }) => {
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
    .option('-I, --apiId <number>', 'apiId', '2040')
    .option('-H, --apiHash <string>', 'apiHash', 'b18441a1ff607e10a989891a5462e627')
    .option('-S, --session <string>', 'session (not bot session)', '')
    .option('-M, --maxMessages <number>', 'max messages to fetch default 100000', '100000')
    .option('-T, --top <number>', 'top messages to forward', '100')
    .option('-O, --offsetId <number>', 'offset id for messages')
    .option('-P, --proxy <string>', 'proxy url (e.g. socks5://[user:pass@]127.0.0.1:7890)', '')
    .option('-F, --forward <string>', 'forward hottest messages to a specific chat (default: me)', 'me')
    .helpOption("-h, --help", "help for command")
    .version(packageJson.version)

  program.parse();
  const options: TCommandOptions = program.opts();
  checkOptions(options);
  return options;
};

const checkOptions = (options: TCommandOptions) => {
  if (options.apiId === '2040' && options.apiHash === 'b18441a1ff607e10a989891a5462e627' && !options.session) {
    console.error(chalk.blue('Not input apiId、apiHash or session, use default apiId、apiHash.'));
  }
}

export default commander;