import { Task } from './interface';

// @ts-ignore
const chalk = require('chalk');
// @ts-ignore
const symbols = require('log-symbols');

function printTasks(tasks: Task[]) {
  console.log(tasks);
}

// function sayHello() {
//   console.log('欢迎使用基于 Node.js 的 Todo-List!');
//   console.log('使用方法：');
//   console.log('    - add: 添加任务。例如 node todo add 学习Node.js');
//   console.log('    - edit: 编辑任务。例如 node todo edit 学习Node.js 学习JavaScript');
//   console.log('    - done: 完成任务。例如 node todo done 学习Node.js');
//   console.log('    - delete: 删除任务。例如 node todo delete 学习JavaScript');
// }

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
  printTasks,
  Level,
  logger
};
