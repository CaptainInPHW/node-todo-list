// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .option('-e, --edit', 'edit group')
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} t
  $ ${chalk.greenBright('st')} t -e
  `)
  .action((opts: unknown) => {
    console.log(opts);
  });

program.parse(process.argv);
