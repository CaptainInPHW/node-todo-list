// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const { Command } = require('commander');
// @ts-ignore
const program = new Command();

// @ts-ignore
const TagController = require('../controller/tag');
// @ts-ignore
const { logger, Print } = require('../utils');

// @ts-ignore
const text = `
${chalk.bgGreen.bold(' Example call ')}
  $ ${chalk.green('st')} tag
  $ ${chalk.green('st')} tag shopping
  $ ${chalk.green('st')} tag -e skill
  $ ${chalk.green('st')} tag del skill
`;

program
  .arguments('[tag_name]')
  .addHelpText('after', text)
  .description(
    emoji.emojify(':beers: create or edit tag'),
    { tagName: 'name of the tag you want to edit' }
  )
  .option('-e, --edit', 'edit tag')
  .command('del', 'delete a tag', { executableFile: 'tag-del' })
  .action((tagName: string, opts: { edit?: boolean }) => {
    // list all tags
    if (!opts.edit && !tagName) {
      const tags = TagController.get();
      if (!tags.length) {
        return logger('error', `Your tag list is empty`);
      }
      Print.Tags(tags);
      return;
    }

    // edit tag
    if (opts.edit && tagName) {
      return inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter a new name',
        filter: (input: string) => input.trim(),
        validate: (input: string) => !!input || Promise.reject('tag name is required!')
      }]).then((answers: { name: string }) => {
        TagController.update(tagName, answers.name);
        logger('success', `Success, you can type ${chalk.green('st tag')} to view all tags`);
      });
    }

    if (opts.edit && !tagName) {
      return logger('info', 'Maybe you should provide a tag name?');
    }

    // create tag
    if (TagController.isExist(tagName)) {
      return logger('error', `Tag ${chalk.green(tagName)} already exists`);
    }
    TagController.create(tagName);
    logger('success', `Success, you can enter ${chalk.green('st tag')} to view all tags`);
  });

program.parse(process.argv);
