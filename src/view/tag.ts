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
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} tag
  $ ${chalk.greenBright('st')} tag ${chalk.underline.bold('shopping')}
  $ ${chalk.greenBright('st')} tag -e ${chalk.underline.bold('skill')}
  $ ${chalk.greenBright('st')} tag del ${chalk.underline.bold('skill')}
`;

program
  .arguments('[tag_name]')
  .addHelpText('after', text)
  .description(
    emoji.emojify(':beers: create or edit tag'),
    { tagName: 'name of the tag you want to edit' }
  )
  .option('-e, --edit', 'edit tag')
  .command('del', 'delete a tag', { executableFile: 'view/tag-del' })
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
        logger('success', `Success, you can type ${chalk.greenBright('st tag')} to view all tags`);
      });
    }

    if (opts.edit && !tagName) {
      return logger('info', 'Maybe you should provide a tag name?');
    }

    // create tag
    if (TagController.isExist(tagName)) {
      return logger('error', `Tag ${chalk.greenBright(tagName)} already exists`);
    }
    TagController.create(tagName);
    logger('success', `Success, you can enter ${chalk.greenBright('st tag')} to view all tags`);
  });

program.parse(process.argv);
