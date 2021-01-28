#!/usr/bin/env node

// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const { program } = require('commander');
const Database = require('./model/database');
const packageJSON = require('../package.json');

Database.initial();

// TODO: missed command
program.on('command:*', function () {
  program.outputHelp();
});

program
  .version(packageJSON.version)
  .description(emoji.emojify(':beers: A simple command line to-do list tool.'))
  .command('l', 'list tasks', { executableFile: 'view/l' })
  .command('t', 'list tags, or create tag', { executableFile: 'view/t' })
  .command('g', 'list groups, or create group', { executableFile: 'view/g' })
  .command('d', 'delete task or tag or group', { executableFile: 'view/d' })
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

program.parse(process.argv);
