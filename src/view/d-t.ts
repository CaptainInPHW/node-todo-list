// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

program
  .name('t')
  .usage('[options]')
  .description(emoji.emojify(':beers: delete tag'))
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} d t ${chalk.underline.bold('work')}
  `)
  .action(() => {
    console.log('del a tag');
  });

program.parse(process.argv);
