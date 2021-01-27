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
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'title',
        filter: (input: string) => input.trim(),
        validate: (input: string) => !!input || Promise.reject('task title is required!')
      },
      {
        type: 'input',
        name: 'description',
        message: 'description',
        filter: (input: string) => input.trim()
      },
      {
        type: 'confirm',
        name: 'needTag',
        message: `add a tag ${chalk.dim(`(Press ${chalk.greenBright.bold('Enter')} to skip)`)}`,
        default: false
      },
      {
        type: 'list',
        name: 'tag',
        message: 'select a tag',
        when: (answers: { needTag: boolean }) => answers.needTag,
        choices: [{ value: 1, name: 'eat' }, { value: 2, name: 'fuck' }]
      }
    ]).then((answers: unknown) => {
      console.log(answers);
    });
  });

program.on('command:*', () => {
  program.outputHelp();
});

program.parse(process.argv);
