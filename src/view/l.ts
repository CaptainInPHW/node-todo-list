// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .option('-a, --all', 'list all tasks')
  .option('-v, --verbose', 'list tasks in detail')
  .addHelpText('after', `
Example:
  $ st l
  $ st l -av
  `)
  .action((args: unknown) => {
    console.log('list tasks', args);
  });

program.parse(process.argv);
