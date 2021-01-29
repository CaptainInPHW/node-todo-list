import { Tag } from '../interface';

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

program
  .arguments('[tag_name]')
  .description(emoji.emojify(':beers: create or edit tag'))
  .option('-e, --edit', 'edit tag')
  .addHelpText('after', `
${chalk.bgGreen.bold.italic(' Example ')}
  $ ${chalk.greenBright('st')} t
  $ ${chalk.greenBright('st')} t ${chalk.underline.bold('shopping')}
  $ ${chalk.greenBright('st')} t -e ${chalk.underline.bold('skill')}
  `)
  .action((tagName: string, opts: { edit?: boolean }) => {
    // list all tags
    if (!tagName) {
      const tags = TagController.get();
      if (!tags.length) {
        return logger('error', `Your tag list is empty`);
      }
      Print.Tags(tags.filter((t: Tag) => t.active));
      return;
    }

    // edit tag
    if (opts.edit) {
      return inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter a new name',
        filter: (input: string) => input.trim(),
        validate: (input: string) => !!input || Promise.reject('tag name is required!')
      }]).then((answers: { name: string }) => {
        TagController.update(tagName, answers.name);
        logger('success', `Success, you can type ${chalk.greenBright.underline('st t')} to view all tags`);
      });
    }

    // create tag
    if (TagController.isExist(tagName)) {
      return logger('error', `Tag ${chalk.greenBright.bold.underline(tagName)} already exists`);
    }
    TagController.create(tagName);
    logger('success', `Success, you can enter ${chalk.greenBright.underline('st t')} to view all tags`);
  });

program.parse(process.argv);
