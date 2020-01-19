const utils = require('./utils');

const command = process.argv[2];
const mainContent = process.argv[3];
const subContent = process.argv[4];

const commands = ['list', 'add', 'edit', 'done', 'delete'];

if (command === undefined) {
  utils.sayHello();
}

if (!commands.includes(command)) {
  utils.onCommandUnrecognized(command);
}

switch (command) {
  case 'list' : {
    utils.printTasks();
  }
    break;
  case 'add': {
    utils.addTask(mainContent, function () {
      utils.printWithTasks('添加成功！');
    });
  }
    break;
  case 'edit': {
    utils.editTask({ index: mainContent, content: subContent }, function () {
      utils.printWithTasks('更改成功！');
    });
  }
    break;
  case 'done': {
    utils.doneTask(mainContent, function () {
      utils.printWithTasks('恭喜你完成一项任务！');
    });
  }
    break;
  case 'delete': {
    utils.deleteTask(mainContent, function () {
      utils.printWithTasks('删除成功！');
    });
  }
    break;
}
