// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();
// @ts-ignore
const TaskController = require('../controller/task');

/**
 *  Add a new task by default
 */
program
  .action(() => {
    console.log('Add a new task by default');
  });

/**
 *  Add a new tag
 */
program
  .command('tag <tag_name>')
  .description(chalk.underline.bold('Add a new tag'))
  .action(() => {
    const [, ...rest] = program.args;
    const tagName = rest.join(' ');
    console.log(tagName);
  })
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} add tag ${chalk.bold.underline('shopping')}
  $ ${chalk.greenBright('st')} add tag ${chalk.bold.underline('\'useful skill\'')}
  `);

/**
 *  Add a new group
 */
program
  .command('group <group_name>')
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
