// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const TaskController = require('../controller/task');
// @ts-ignore
const { logger } = require('../utils');
// @ts-ignore
const program = new Command();

// @ts-ignore
const text = `
${chalk.bgGreen.bold(' Example call ')}

  $ ${chalk.green('st')} del 123
`;

program
  .arguments('<task_id>')
  .addHelpText('after', text)
  .description(
    emoji.emojify(':beers: delete a task'),
    { task_id: 'id of the task you want to delete' }
  )
  .action((taskId: string) => {
    const id = Number(taskId);
    if (Number.isNaN(id)) {
      return logger('error', 'You must enter a numeric id.');
    }
    if (!TaskController.get(id).length) {
      return logger('error', `The task with id ${chalk.green(taskId)} does not exist`);
    }
    TaskController.remove(id);
    logger('success', 'You have removed a task');
  });

program.parse(process.argv);
