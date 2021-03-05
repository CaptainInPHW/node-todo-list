import { Tag, Task } from './interface';

// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const symbols = require('log-symbols');

const Print = {
  Tasks: (tasks: Task[], verbose?: boolean) => {
    console.log();
    if (verbose) {
      console.log('<------------------------------------------------------------------------------------------->');
    }
    for (const task of tasks) {
      if (verbose) {
        console.log();
      }
      console.log(`  ${chalk.dim.bold(task.id)}. ${chalk.bold(task.title)} ${emoji.emojify(task.statusName)} ${task.level ? task.level : ''}`);
      if (verbose) {
        if (task.description) {
          console.log();
          console.log(emoji.emojify(`  ${chalk.dim(task.description)}`));
        }
        console.log();
        let extra: string = '  ';
        if (task.tagId) {
          extra += emoji.emojify(`:label:  ${task.tagName}`);
        }
        if (extra.trim()) {
          console.log(extra);
          console.log();
        }
        console.log('<------------------------------------------------------------------------------------------->');
      }
    }
    console.log();
  },
  Tags: (tags: Tag[]) => {
    console.log();
    tags.filter(tag => tag.active).forEach(tag => console.log(emoji.emojify(`:label:  ${tag.name}`)));
    console.log();
  }
};

const Level = {
  Low: chalk.blueBright.bold('!'),
  High: chalk.redBright.bold('!!!'),
  Middle: chalk.yellowBright.bold('!!')
};

const logger = <T extends keyof typeof symbols>(type: T, msg: string) => {
  console.log();
  console.log(symbols[type], msg);
  console.log();
};

module.exports = {
  Print,
  Level,
  logger
};
