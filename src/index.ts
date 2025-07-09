import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';

const program = new Command();

clear();
console.log(
  chalk.yellow(
    figlet.textSync("THM", {
      font: "Ghost",
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
  .version('0.0.1')
  .option('-i, --apiId <number>', 'apiId')
  .option('-a, --apiHash <string>', 'apiHash')
  .option('-s, --session <string>', 'session')
  .helpOption("-h, --help", "help for command");

program.parse();
const options = program.opts();
console.log(options);