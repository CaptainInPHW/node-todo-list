// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .name('g')
  .usage('[options]')
  .addHelpText('after', `
Example:
  $ st d g
  `)
  .action(() => {
    console.log('del a group');
  });

program.parse(process.argv);
