import { Task } from './interface';

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

module.exports = {
  printTasks
};
