// @ts-ignore
import { Status } from '../interface';

// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const program = new Command();
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Print, logger } = require('../utils');
// @ts-ignore
const TaskController = require('../controller/task');

const text = `
${chalk.bgGreen.bold.italic(' Example call ')}

  $ ${chalk.greenBright('st')} ls
  $ ${chalk.greenBright('st')} ls -av
`;

program
  .addHelpText('after', text)
  .description(emoji.emojify(':beers: list tasks'))
  .option('-a, --all', 'list all tasks')
  .option('-v, --verbose', 'list all tasks in detail')
  .action(function handleAction(options: { all?: boolean; verbose?: boolean }) {
    const tasks = options.all ? TaskController.get() : TaskController.getByStatus(Status.Todo);
    tasks.length
      ? Print.Tasks(tasks, options.verbose)
      : logger('info', `Your list is empty, use ${chalk.green('st')} command to add a ${chalk.yellow('TODO')} task`);
  });

program.parse(process.argv);
