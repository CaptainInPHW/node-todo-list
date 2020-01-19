const fs = require('fs');

function isDatabaseExist() {
  return fs.existsSync('./.db');
}

function isDatabaseEmpty() {
  const content = fs.readFileSync('./.db').toString();
  if (content === '') {
    return true;
  }
  try {
    const contentObj = JSON.parse(content);
    if (Object.keys(contentObj).length === 0) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

function createDatabase(callback) {
  fs.writeFileSync('./.db', JSON.stringify({}));
  if (callback) {
    callback();
  }
}

function readDatabase() {
  if (!isDatabaseExist()) {
    createDatabase();
    return {};
  }
  return JSON.parse(fs.readFileSync('./.db').toString());
}

function writeDatabase(content, callback) {
  const jsonContent = JSON.stringify(content);
  fs.writeFileSync('./.db', jsonContent);
  callback();
}

function sayHello() {
  print('欢迎使用基于 Node.js 的 Todo-List!');
  printDivider();
  print('使用方法：');
  console.log('    - add: 添加任务。例如 node todo add 学习Node.js');
  console.log('    - edit: 编辑任务。例如 node todo edit 学习Node.js 学习JavaScript');
  console.log('    - done: 完成任务。例如 node todo done 学习Node.js');
  console.log('    - delete: 删除任务。例如 node todo delete 学习JavaScript');
  console.log();
}

function onCommandUnrecognized(command) {
  if (command !== undefined) {
    print(`未能识别您输入的命令：${command}`);
  }
}

function print(content) {
  console.log();
  console.log(content);
  console.log();
}

function printDivider() {
  console.log('--------------------');
}

function printWithTasks(content) {
  print(content);
  printDivider();
  printTasks();
}

function printTasks() {
  if (isDatabaseExist() && !isDatabaseEmpty()) {
    const db = readDatabase('./.db');
    const { todo = [], done = [] } = db;
    printWith('Todo', todo);
    printWith('Done', done);
  }
}

function printWith(category, contents) {
  print(`${category}:`);
  if (contents.length === 0) {
    console.log('    无内容');
  }
  contents.forEach((item, index) => {
    console.log(`    ${index + 1}. ${item}`);
  });
}

function addTask(content, callback) {
  if (content === undefined) {
    print('内容不能为空！');
    return;
  }
  const db = readDatabase();
  const todo = [...(db.todo || [])];
  todo.unshift(content);
  writeDatabase(Object.assign(db, { todo }), callback);
}

function editTask({ index, content }, callback) {
  if (index === undefined || Number.isNaN(Number(index))) {
    printWithTasks('请输入需要更改的任务清单序号！');
    return;
  }
  if (content === undefined) {
    printWithTasks('更改内容不能为空！');
    return;
  }
  const db = readDatabase();
  const { todo = [], done = [] } = db;
  if (todo[index] === undefined) {
    printWithTasks('你要更改的任务不存在！');
  }
  todo.splice(index - 1, 1, content);
  writeDatabase(Object.assign(db, { todo }), callback);
}

function doneTask(index, callback) {
  if (index === undefined || Number.isNaN(Number(index))) {
    printWithTasks('请输入未完成的任务清单序号！');
    return;
  }
  const db = readDatabase();
  const { todo = [], done = [] } = db;
  const [removedTask] = todo.splice(index - 1, 1);
  done.unshift(removedTask);
  writeDatabase(Object.assign(db, { todo, done }), callback);
}

function deleteTask(index, callback) {
  if (index === undefined || Number.isNaN(Number(index))) {
    print('请输入未完成的任务清单序号进行删除！');
    printDivider();
    printTasks();
    return;
  }
  const db = readDatabase();
  const todo = [...(db.todo || [])];
  todo.splice(index - 1, 1);
  writeDatabase(Object.assign(db, { todo }), callback);
}

module.exports = {
  sayHello,
  onCommandUnrecognized,
  printWithTasks,
  printTasks,
  addTask,
  editTask,
  doneTask,
  deleteTask
};