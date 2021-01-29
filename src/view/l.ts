// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

// @ts-ignore
const { Print } = require('../utils');
// @ts-ignore
const TaskController = require('../controller/task');

program
  .description(emoji.emojify(':beers: list tasks'))
  .option('-a, --all', 'list all tasks')
  .option('-v, --verbose', 'list tasks in detail')
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} l
  $ ${chalk.greenBright('st')} l -av
  `)
  .action(() => {
    Print.Tasks(TaskController.get());
  });

program.parse(process.argv);
