#!/usr/bin/env node

import { Group, Answers, Tag } from './interface';

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
// @ts-ignore
const GroupController = require('./controller/group');

Database.initial();

program
  .version(packageJSON.version)
  .description(emoji.emojify(':beers: A simple command line to-do list tool.'))
  .command('l', 'list tasks', { executableFile: 'view/l' })
  .command('t', 'list tags, or create tag', { executableFile: 'view/t' })
  .command('g', 'list groups, or create group', { executableFile: 'view/g' })
  .command('d', 'delete task or tag or group', { executableFile: 'view/d' });

program
  .arguments('[task_name]')
  .option('-c, --complete', 'complete a task')
  .action((taskName: string, opts: { complete: boolean }) => opts.complete ? completeTask(taskName) : createTask())
;

program.parse(process.argv);

function createTask() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
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
      when: (answers: { levelEnable: boolean }) => answers.levelEnable
    },
    {
      type: 'confirm',
      name: 'tagEnable',
      default: false,
      message: `add a tag ${chalk.dim(`(Press ${chalk.greenBright.bold('Enter')} to skip)`)}`
    },
    {
      type: 'list',
      name: 'tag',
      loop: false,
      pageSize: 10,
      message: `select or create a tag ${chalk.dim('(the last option)')}`,
      when: (answers: { tagEnable: boolean }) => answers.tagEnable,
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
      when: (answers: { tag: number }) => answers.tag === 0,
      validate: (input: string) => !!input || Promise.reject('tag name is required!')
    },
    {
      type: 'confirm',
      name: 'groupEnable',
      default: false,
      message: `add a group ${chalk.dim(`(Press ${chalk.greenBright.bold('Enter')} to skip)`)}`
    },
    {
      type: 'list',
      name: 'group',
      loop: false,
      pageSize: 10,
      message: `select or create a group ${chalk.dim('(the last option)')}`,
      when: (answers: { groupEnable: boolean }) => answers.groupEnable,
      choices: () => {
        return GroupController.get()
          .filter((g: Group) => g.active)
          .map((g: Group) => ({ name: g.name, value: g.id }))
          .concat(new inquirer.Separator())
          .concat({ value: 0, name: emoji.emojify(':sparkles: create a new group'), short: 'create a new group' });
      }
    },
    {
      type: 'input',
      name: 'groupName',
      message: 'group name',
      filter: (input: string) => input.trim(),
      when: (answers: { group: number }) => answers.group === 0,
      validate: (input: string) => !!input || Promise.reject('group name is required!')
    }
  ]).then((answers: Answers) => {
    const tag = answers.tagEnable ? (answers.tag || TagController.create(answers.tagName).id) : undefined;
    const group = answers.groupEnable ? (answers.group || GroupController.create(answers.groupName).id) : undefined;
    TaskController.create({ tag, group, level: answers.level, name: answers.name, description: answers.description });
    logger('success', `Success, you can enter ${chalk.greenBright.underline('st l')} to view all tasks`);
  });
}

function completeTask(taskName?: string) {
  console.log(taskName);
}
