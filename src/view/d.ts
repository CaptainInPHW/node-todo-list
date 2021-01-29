// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

/**
 *  delete tag or group
 */
program
  .command('t', 'delete tag')
  .command('g', 'delete group')
  .description(emoji.emojify(':beers: delete task or tag or group'));

/**
 *  list tasks
 */
program
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} d
  $ ${chalk.greenBright('st')} d t
  $ ${chalk.greenBright('st')} d g
  $ ${chalk.greenBright('st')} d t ${chalk.underline.bold('work')}
  $ ${chalk.greenBright('st')} d g ${chalk.underline.bold('learning')}
  `)
  .action(() => {
    console.log('del task');
  });

program.parse(process.argv);
