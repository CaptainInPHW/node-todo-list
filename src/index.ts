#!/usr/bin/env node

import { Answers, Tag } from './interface';

// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const { program } = require('commander');
// @ts-ignore
const { Level, logger } = require('./utils');
// @ts-ignore
const Database = require('./model/database');
// @ts-ignore
const packageJSON = require('../package.json');
// @ts-ignore
const TagController = require('./controller/tag');
// @ts-ignore
const TaskController = require('./controller/task');

Database.initial();

program
  .version(packageJSON.version)
  .allowExcessArguments(false)
  .allowUnknownOption(false)
  .description(emoji.emojify(':beers: A simple command line To-do list tool.'))
  .command('ls', 'list task', { executableFile: 'view/ls' })
  .command('tag', 'list all tags', { executableFile: 'view/tag' })
  .command('del', 'delete a task', { executableFile: 'view/del' })
  .command('done', 'complete a task', { executableFile: 'view/done' })
  .action(createTask);

program.parse(process.argv);

function createTask() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'title',
      filter: (input: string) => input.trim(),
      validate: (input: string) => !!input || Promise.reject('task title is required!')
    },
    {
      type: 'input',
      name: 'description',
      message: 'description',
      filter: (input: string) => input.trim()
    },
    {
      type: 'confirm',
      name: 'levelEnable',
      default: false,
      message: `add a level ${chalk.dim(`(Press ${chalk.greenBright.bold('Enter')} to skip)`)}`
    },
    {
      type: 'list',
      name: 'level',
      loop: false,
      message: 'select a level',
      choices: [Level.High, Level.Middle, Level.Low],
      when: (answers: Answers) => answers.levelEnable
    },
    {
      type: 'confirm',
      name: 'tagEnable',
      default: false,
      message: `add a tag ${chalk.dim(`(Press ${chalk.greenBright.bold('Enter')} to skip)`)}`
    },
    {
      type: 'list',
      name: 'tagId',
      loop: false,
      pageSize: 10,
      when: (answers: Answers) => answers.tagEnable,
      message: `select or create a tag ${chalk.dim('(the last option)')}`,
      choices: () => {
        return TagController.get()
          .filter((t: Tag) => t.active)
          .map((t: Tag) => ({ name: t.name, value: t.id }))
          .concat(new inquirer.Separator())
          .concat({ value: 0, name: emoji.emojify(':sparkles: create a new tag'), short: 'create a new tag' });
      }
    },
    {
      type: 'input',
      name: 'tagName',
      message: 'tag name',
      filter: (input: string) => input.trim(),
      when: (answers: Answers) => answers.tagId === 0,
      validate: (input: string) => !!input || Promise.reject('tag name is required!')
    }
  ]).then((answers: Answers) => {
    let tagId = undefined;
    if (answers.tagEnable && answers.tagId) {
      tagId = answers.tagId;
    } else {
      try {
        const newTag = TagController.create(answers.tagName);
        tagId = newTag.id;
      } catch (error) {
        return logger('error', error.message);
      }
    }
    const task = TaskController.create({
      tagId,
      level: answers.level,
      title: answers.title,
      description: answers.description
    });
    logger('success', `Success, the id of new task is ${chalk.greenBright.underline(task.id)}.`);
  });
}
