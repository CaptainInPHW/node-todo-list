import { Group } from '../interface';

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

// @ts-ignore
const GroupController = require('../controller/group');
// @ts-ignore
const { logger } = require('../utils');

program
  .arguments('[group_name]')
  .option('-e, --edit', 'edit group')
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} g
  $ ${chalk.greenBright('st')} g ${chalk.underline.bold('work')}
  $ ${chalk.greenBright('st')} g -e ${chalk.underline.bold('learning')}
  `)
  .action((groupName: string, opts: { edit?: boolean }) => {
    // list all groups
    if (!groupName) {
      const groups = GroupController.get();
      if (!groups.length) {
        return logger('error', `Your group list is empty`);
      }
      const message = groups.map((group: Group) => emoji.emojify(`:file_folder: ${group.name}`)).join(' ');
      console.log();
      console.log(message);
      console.log();
      return;
    }

    // edit group
    if (opts.edit) {
      return inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter a new name',
        filter: (input: string) => input.trim(),
        validate: (input: string) => !!input || Promise.reject('group name is required!')
      }]).then((answers: { name: string }) => {
        GroupController.update(groupName, answers.name);
        logger('success', `Success, you can type ${chalk.greenBright.underline('st g')} to view all groups`);
      });
    }

    // create group
    if (GroupController.isExist(groupName)) {
      return logger('error', `Group '${groupName}' already exists`);
    }
    GroupController.create(groupName);
    logger('success', `Success, you can enter ${chalk.greenBright.underline('st g')} to view all groups`);
  });

program.parse(process.argv);
