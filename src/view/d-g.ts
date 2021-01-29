// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .name('g')
  .usage('[options]')
  .description(emoji.emojify(':beers: delete group'))
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} d g ${chalk.underline.bold('work')}
  `)
  .action(() => {
    console.log('del a group');
  });

program.parse(process.argv);
