import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';

const program = new Command();

clear();
console.log(
  chalk.yellow(
    figlet.textSync("THM", {
      font: "Blocks",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  )
);

program
  .name('thm')
  .description('CLI to get the hottest messages from a Telegram channel')
  .option('-I, --apiId <number>', 'apiId')
  .option('-A, --apiHash <string>', 'apiHash')
  .option('-S, --session <string>', 'session (not bot session)')
  .helpOption("-H, --help", "help for command")
  .version('0.0.1')

program.parse();
const options = program.opts();
console.log(options);