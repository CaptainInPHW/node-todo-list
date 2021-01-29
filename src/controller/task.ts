import { Group, IncompleteTask, Status, StatusName, Tag, Task } from '../interface';

// @ts-ignore
const chalk = require('chalk');

//@ts-ignore
const Database = require('../model/database');

const StatusName: StatusName = {
  Todo: chalk.yellowBright.bold('Todo'),
  Done: chalk.greenBright.bold('Done'),
  Removed: chalk.gray.strikethrough('Deleted')
};

class TaskController {
  static getCurrentTime() {
    return new Date().toLocaleString();
  }

  static complement(tasks: Task[]): Task[] {
    const tags = Database.read('tags') as Tag[];
    const groups = Database.read('groups') as Group[];
    return tasks.map(task => ({
      ...task,
      statusName: StatusName[Status[task.status] as keyof StatusName],
      tagName: task.tag ? tags.find(tag => tag.id === task.tag)!.name : undefined,
      groupName: task.group ? groups.find(group => group.id === task.group)!.name : undefined
    }));
  }

  public get(id?: number): Task[] {
    const tasks = Database.read('tasks') as Task[];
    // TODO: try Number(id)
    return TaskController.complement(id ? tasks.filter(task => task.id === Number(id)) : tasks);
  }

  public getByStatus(status: Status): Task[] {
    const tasks = this.get();
    return TaskController.complement(tasks.filter(item => item.status === status));
  }

  public getByTag(tag: number, all?: boolean): Task[] {
    const tasks = this.get();
    return TaskController.complement(all
      ? tasks.filter(item => item.group === tag)
      : tasks.filter(item => item.group === tag && item.status === Status.Todo)
    );
  }

  public getByGroup(group: number, all?: boolean): Task[] {
    const tasks = this.get();
    return TaskController.complement(all
      ? tasks.filter(item => item.group === group)
      : tasks.filter(item => item.group === group && item.status === Status.Todo)
    );
  }

  public getByLevel(level: string, all?: boolean): Task[] {
    const tasks = this.get();
    return TaskController.complement(all
      ? tasks.filter(item => item.level === level)
      : tasks.filter(item => item.level === level && item.status === Status.Todo)
    );
  }

  public create(task: IncompleteTask) {
    const tasks = this.get();
    const date = TaskController.getCurrentTime();
    tasks.unshift({
      ...task,
      createAt: date,
      updateAt: date,
      status: Status.Todo,
      id: tasks.length + 1
    });
    Database.write('tasks', tasks);
  }

  public update(task: Task) {
    task.updateAt = TaskController.getCurrentTime();
    const tasks = this.get()
      .filter(t => t.id !== task.id)
      .unshift(task);
    Database.write('tasks', tasks);
  }

  public complete(id: number) {
    const [task] = this.get(id);
    task.status = Status.Done;
    task.completeAt = TaskController.getCurrentTime();
    const tasks = this.get().filter(t => t.id !== id).unshift(task);
    Database.write('tasks', tasks);
  }

  public remove(id: number) {
    const [task] = this.get(id);
    task.status = Status.Removed;
    const tasks = this.get().filter(t => t.id !== id).unshift(task);
    Database.write('tasks', tasks);
  }
}

module.exports = new TaskController();
