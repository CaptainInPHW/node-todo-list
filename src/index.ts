#!/usr/bin/env node

// @ts-ignore
const { program } = require('commander');
const Database = require('./model/database');
const packageJSON = require('../package.json');

Database.initial();

program
  .version(packageJSON.version)
  .description('A simple command line to-do list tool.')
  .command('add', 'Add a new task or tag, group', { executableFile: 'view/add/index' })
  .command('edit', 'Edit an existing task', { executableFile: 'edit' })
  .command('show', 'Show an task', { executableFile: 'edit' })
  .command('delete', 'Delete one of tasks', { executableFile: 'delete' }).alias('del')
  .command('list', 'List to-do tasks', { executableFile: 'view/list' }).alias('ls')
  // TODO: welcome
  .action(() => program.outputHelp());

// TODO: missed command
program.on('command:*', function () {
  program.outputHelp();
});

program.parse(process.argv);
