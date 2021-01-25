const { readDatabase, writeDatabase } = require('./db');

function sayHello() {
  console.log('欢迎使用基于 Node.js 的 Todo-List!');
  printDivider();
  console.log('使用方法：');
  console.log('    - add: 添加任务。例如 node todo add 学习Node.js');
  console.log('    - edit: 编辑任务。例如 node todo edit 学习Node.js 学习JavaScript');
  console.log('    - done: 完成任务。例如 node todo done 学习Node.js');
  console.log('    - delete: 删除任务。例如 node todo delete 学习JavaScript');
  console.log();
}

function printDivider() {
  console.log();
  console.log('--------------------');
  console.log();
}

function printWithTasks(content: string) {
  console.log(content);
  printDivider();
}

function printAllTasks() {
  // const db = readDatabase();
  // const { todo = [], done = [] } = db;
  // printWith('Todo', todo);
  // printWith('Done', done);
}

// function printWith(category: string) {
//   console.log(`${category}:`);
// if (contents.length === 0) {
//   console.log('    无内容');
// }
// contents.forEach((item, index) => {
//   console.log(`    ${index + 1}. ${item}`);
// });
// }

function createTask(content: string | undefined) {
  if (content === undefined) {
    console.log('内容不能为空！');
    return;
  }
  const db = readDatabase();
  const todos = [...(db.todos || [])];
  todos.unshift(content);
  writeDatabase(Object.assign(db, { todos }), 'done');
}

function updateTask({ index, content }: { index: number, content: string }) {
  if (index === undefined || Number.isNaN(Number(index))) {
    printWithTasks('请输入需要更改的任务清单序号！');
    return;
  }
  if (content === undefined) {
    printWithTasks('更改内容不能为空！');
    return;
  }
  const db = readDatabase();
  const { todo = [] } = db.json;
  if (todo[index] === undefined) {
    printWithTasks('你要更改的任务不存在！');
  }
  todo.splice(index - 1, 1, content);
  writeDatabase(Object.assign(db.json, { todo }), 'done');
}

function completeTask(index: number) {
  if (index === undefined || Number.isNaN(Number(index))) {
    printWithTasks('请输入未完成的任务清单序号！');
    return;
  }
  const db = readDatabase();
  const { todo = [], done = [] } = db.json;
  const [removedTask] = todo.splice(index - 1, 1);
  done.unshift(removedTask);
  writeDatabase(Object.assign(db.json, { todo, done }), 'done');
}

function deleteTask(index: number) {
  if (index === undefined || Number.isNaN(Number(index))) {
    console.log('请输入未完成的任务清单序号进行删除！');
    printDivider();
    return;
  }
  const db = readDatabase();
  const todo = [...(db.json.todo || [])];
  todo.splice(index - 1, 1);
  writeDatabase(Object.assign(db.json, { todo }), 'done');
}

module.exports = {
  printAllTasks,
  // printTodoTasks,

  sayHello,
  printWithTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
};
