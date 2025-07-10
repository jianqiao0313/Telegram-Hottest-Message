import { Command } from "commander";
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import { NormalizedPackageJson, readPackage } from 'read-pkg';

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
    .option('-I, --apiId <number>', 'apiId')
    .option('-H, --apiHash <string>', 'apiHash')
    .option('-S, --session <string>', 'session (not bot session)')
    .helpOption("-h, --help", "help for command")
    .version(packageJson.version)

  program.parse();
  const options = program.opts();
  console.log(options);
};

const main = async () => {
  const packageJson = await readPackage();
  commander(packageJson)
}
main();