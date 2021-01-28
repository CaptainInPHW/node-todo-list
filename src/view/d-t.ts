// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .name('t')
  .usage('[options]')
  .addHelpText('after', `
Example:
  $ st d t
  `)
  .action(() => {
    console.log('del a tag');
  });

program.parse(process.argv);
