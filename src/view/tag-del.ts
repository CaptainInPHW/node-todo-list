// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const TagController = require('../controller/tag');
// @ts-ignore
const { logger } = require('../utils');
// @ts-ignore
const program = new Command();

// @ts-ignore
const text = `
${chalk.bgGreen.bold(' Example call ')}

  $ ${chalk.green('st')} tag del skill
`;

program
  .arguments('<tag_name>')
  .addHelpText('after', text)
  .description(
    emoji.emojify(':beers: delete a tag'),
    { task_id: 'id of the tag you want to delete' }
  )
  .action((tagName: string) => {
    if (!TagController.isExist(tagName)) {
      return logger('error', `Tag ${chalk.green(tagName)} is not exist`);
    }
    const [tag] = TagController.get(tagName);
    if (!tag || !tag.active) {
      return logger('error', `Tag ${chalk.green(tagName)} is not exist`);
    }
    TagController.remove(tagName);
    logger('success', 'You have removed a tag');
  });

program.parse(process.argv);
