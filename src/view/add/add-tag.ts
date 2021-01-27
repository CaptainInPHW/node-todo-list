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
  .command('tag <tag_name>')
  .description(emoji.emojify(':bulb: Add a new tag'))
  .action(() => {
    const [, ...rest] = program.args;
    const tagName = rest.join(' ');
    console.log(tagName);
  })
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} add tag ${chalk.bold.underline('shopping')}
  $ ${chalk.greenBright('st')} add tag ${chalk.bold.underline('useful skill')}
  `);

