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
${chalk.bgGreen.bold.italic(' Example call ')}

  $ ${chalk.greenBright('st')} tag del ${chalk.underline.bold('skill')}
`;

program
  .arguments('<tag_name>')
  .addHelpText('after', text)
  .description(
    emoji.emojify(':beers: delete a tag'),
    { task_id: 'id of the tag you want to delete' }
  )
  .action((tagName: string) => {
    if (TagController.isExist(tagName)) {
      return logger('error', `Tag ${chalk.greenBright(tagName)} is not exist`);
    }
    if (Number.isNaN(id)) {
      return logger('error', 'You must enter a numeric id.');
    }
    if (!TaskController.get(id).length) {
      return logger('error', `The task with id ${chalk.green.bold(taskId)} does not exist`);
    }
    TaskController.remove(id);
    logger('success', 'You have removed a task');
  });

program.parse(process.argv);
