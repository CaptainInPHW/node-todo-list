import { IncompleteTask, Status, StatusName, Tag, Task } from '../interface';

// @ts-ignore
const chalk = require('chalk');
//@ts-ignore
const Database = require('../model/database');

const StatusName: StatusName = {
  Todo: chalk.yellow.bold('Todo'),
  Done: chalk.green.bold('Done'),
  Removed: chalk.gray.strikethrough('Deleted')
};

class TaskController {
  static getCurrentTime() {
    return new Date().toLocaleString();
  }

  static complement(tasks: Task[]): Task[] {
    const tags = Database.read('tags') as Tag[];
    return tasks.map(task => ({
      ...task,
      statusName: StatusName[Status[task.status] as keyof StatusName],
      tagName: task.tagId ? tags.find(tag => tag.id === task.tagId)!.name : undefined
    }));
  }

  public get(id?: number): Task[] {
    const tasks = Database.read('tasks') as Task[];
    return TaskController.complement(id ? tasks.filter(task => task.id === id) : tasks);
  }

  public getByStatus(status: Status): Task[] {
    const tasks = this.get();
    return TaskController.complement(tasks.filter(item => item.status === status));
  }

  public getByTag(tagId: number, all?: boolean): Task[] {
    const tasks = this.get();
    return TaskController.complement(all
      ? tasks.filter(item => item.tagId === tagId)
      : tasks.filter(item => item.tagId === tagId && item.status === Status.Todo)
    );
  }

  public getByLevel(level: string, all?: boolean): Task[] {
    const tasks = this.get();
    return TaskController.complement(all
      ? tasks.filter(item => item.level === level)
      : tasks.filter(item => item.level === level && item.status === Status.Todo)
    );
  }

  public create(incompleteTask: IncompleteTask) {
    const tasks = this.get();
    const date = TaskController.getCurrentTime();
    const task = {
      ...incompleteTask,
      createAt: date,
      updateAt: date,
      status: Status.Todo,
      id: tasks.length + 1
    };
    tasks.push(task);
    Database.write('tasks', tasks);
    return task;
  }

  public update(task: Task) {
    task.updateAt = TaskController.getCurrentTime();
    const tasks = this.get().filter(t => t.id !== task.id);
    Database.write('tasks', tasks.concat(task));
  }

  public complete(id: number) {
    const [task] = this.get(id);
    if ([Status.Removed, Status.Done].includes(task.status)) {
      throw new Error(`The task with id ${chalk.green.bold(id)} has been completed or removed`);
    }
    task.status = Status.Done;
    task.completeAt = TaskController.getCurrentTime();
    const tasks = this.get().filter(t => t.id !== id);
    Database.write('tasks', tasks.concat(task));
  }

  public remove(id: number) {
    const [task] = this.get(id);
    task.status = Status.Removed;
    const tasks = this.get().filter(t => t.id !== id);
    Database.write('tasks', tasks.concat(task));
  }
}

module.exports = new TaskController();
