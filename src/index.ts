#!/usr/bin/env node

const utils = require('./utils');
const initial = require('./db').initial;
const { program } = require('commander');
const packageJSON = require('../package.json');

initial();

program.version(packageJSON.version);

program
  .command('list')
  .alias('ls')
  .description('List your to-do items')
  .option('-a, --all', 'List all items, including to-do items and completed', false)
  .action((options: { all: boolean }) => options.all ? utils.printAllTasks() : utils.printTodoTasks());

program.parse(process.argv);
