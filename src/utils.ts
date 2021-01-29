import { Group, Tag, Task } from './interface';

// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const emoji = require('node-emoji');
// @ts-ignore
const symbols = require('log-symbols');


const Print = {
  Tasks: (tasks: Task[]) => {
    tasks.forEach((task, index) => {
      console.log();
      console.log(emoji.emojify(`  ${task.level ? task.level + ' ' : ''}${chalk.underline.bold(task.name)}  ${emoji.emojify(task.statusName)}`));
      if (task.description) {
        console.log();
        console.log(emoji.emojify(`  ${chalk.dim(task.description)}`));
      }
      console.log();
      let extra: string = '  ';
      if (task.group) {
        extra += emoji.emojify(`:file_folder: ${task.groupName}`);
      }
      if (task.tag) {
        extra += ' ' + emoji.emojify(`:label:  ${task.tagName}`);
      }
      if (extra.trim()) {
        console.log(extra);
        console.log();
      }
      if (index !== tasks.length - 1) {
        console.log('--------------------------------------------------------------------------------------------');
      }
    });
  },
  Tags: (tags: Tag[]) => {
    console.log();
    console.log(tags.map(t => emoji.emojify(`:label: ${t.name}`)));
    console.log();
  },
  Groups: (groups: Group[]) => {
    console.log();
    console.log(groups.map(g => emoji.emojify(`:file_folder: ${g.name}`)));
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
