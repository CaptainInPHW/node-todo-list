// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();
// @ts-ignore
const TaskController = require('../controller/task');

program
  .option('-a, --all', 'List all items')
  .option('-v, --verbose', 'List all items with detail info')
  .addHelpText('after', `
Example:
  $ st list
  $ st ls
  $ st list -a
  $ st list -av
  $ st list --all
  $ st list --all --verbose
  `);

program.parse(process.argv);

//@ts-ignore
const opts = program.opts();

console.log(opts);
console.log(TaskController.get());
