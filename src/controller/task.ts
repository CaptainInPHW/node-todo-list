import { Group, IncompleteTask, Level, Status, Tag, Task } from '../interface';

const Database = require('../model/database');

class TaskController {
  static getCurrentTime() {
    return new Date().toLocaleString();
  }

  static complement(tasks: Task[]): Task[] {
    const tags = Database.read('tags') as Tag[];
    const levels = Database.read('levels') as Level[];
    const groups = Database.read('groups') as Group[];
    return tasks.map(task => ({
      ...task,
      levelName: task.level ? levels.find(level => level.id === task.level)!.name : undefined,
      groupName: task.group ? groups.find(group => group.id === task.group)!.name : undefined,
      tagName: task.tags && task.tags.length ? task.tags.map(tagId => tags.find(tag => tag.id === tagId)!.name).join('、') : undefined
    }));
  }

  public get(id?: number): Task[] {
    const tasks = Database.read('tasks') as Task[];
    // TODO: try Number(id)
    return TaskController.complement(id ? tasks.filter(task => task.id === Number(id)) : tasks);
  }

  public getByStatus(status: Status): Task[] {
    const items = Database.read('tasks') as Task[];
    return TaskController.complement(items.filter(item => item.status === status));
  }

  public getByTag(tag: number, all?: boolean): Task[] {
    const items = Database.read('tasks') as Task[];
    return TaskController.complement(all
      ? items.filter(item => item.group === tag)
      : items.filter(item => item.group === tag && item.status === Status.Todo)
    );
  }

  public getByGroup(group: number, all?: boolean): Task[] {
    const items = Database.read('tasks') as Task[];
    return TaskController.complement(all
      ? items.filter(item => item.group === group)
      : items.filter(item => item.group === group && item.status === Status.Todo)
    );
  }

  public getByLevel(level: number, all?: boolean): Task[] {
    const items = Database.read('tasks') as Task[];
    return TaskController.complement(all
      ? items.filter(item => item.level === level)
      : items.filter(item => item.group === level && item.status === Status.Todo)
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
    const tasks = this.get().filter(t => t.id !== task.id).unshift(task);
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
