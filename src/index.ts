#!/usr/bin/env node

// @ts-ignore
const { program } = require('commander');
const Database = require('./model/database');
const packageJSON = require('../package.json');

Database.initial();

program
  .version(packageJSON.version)
  .description('A simple command line to-do list tool.')
  .command('add', 'Add a new item', { executableFile: 'view/add' })
  .command('edit', 'Edit an existing item', { executableFile: 'edit' })
  .command('show', 'Show an item', { executableFile: 'edit' })
  .command('delete', 'Delete one of items', { executableFile: 'delete' }).alias('del')
  .command('list', 'List to-do items', { executableFile: 'view/list' }).alias('ls')
  // TODO: welcome
  .action(() => program.outputHelp());

// TODO: missed command
program.on('command:*', function () {
  program.outputHelp();
});

program.parse(process.argv);
