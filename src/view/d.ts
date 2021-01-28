// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

/**
 *  delete tag or group
 */
program
  .command('t', 'delete tag')
  .command('g', 'delete group');

/**
 *  list tasks
 */
program
  .addHelpText('after', `
Example:
  $ st d
  $ st d t
  $ st d g
  `)
  .action((args: unknown) => {
    console.log('del task', args);
  });

program.parse(process.argv);
