// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .command('tag', emoji.emojify(':sparkles: Add a new tag'), { executableFile: 'add-tag' })
  .command('task', emoji.emojify(':sparkles: Add a new task'), { executableFile: 'add-task' })
  .command('group', emoji.emojify(':sparkles: Add a new group'))
  .action(() => program.outputHelp());

program.on('command:*', () => {
  program.outputHelp();
});

program.parse(process.argv);
