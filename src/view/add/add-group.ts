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
  .arguments('<group_name>')
  .description(chalk.underline.bold('Add a new group'))
  .action((groupName: string) => {
    console.log(groupName);
  })
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} add group ${chalk.bold.underline('work')}
  $ ${chalk.greenBright('st')} add group ${chalk.bold.underline('shopping')}
  `);

program.parse(process.argv);
