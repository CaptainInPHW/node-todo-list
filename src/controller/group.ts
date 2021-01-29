import { Group } from '../interface';

//@ts-ignore
const Database = require('../model/database');

class GroupController {
  public get(name?: string): Group[] {
    const groups = Database.read('groups') as Group[];
    return name ? groups.filter(group => group.name === name) : groups;
  }

  public isExist(name: string): boolean {
    const [group] = this.get(name);
    return !!group;
  }

  public toggle(name: string, active: boolean) {
    const groups = this.get();
    groups.forEach(g => g.name === name && (g.active = active));
    Database.write('groups', groups);
  }

  public create(name: string) {
    const groups = this.get();
    const group = { id: groups.length + 1, name, active: true };
    Database.write('groups', groups.unshift(group));
  }

  public update(before: string, after: string) {
    const groups = this.get();
    groups.forEach(g => g.name === before && (g.name = after));
    Database.write('groups', groups);
  }

  public remove(name: string) {
    const groups = this.get();
    groups.forEach(g => g.name === name && (g.active = false));
    Database.write('groups', groups);
  }
}

module.exports = new GroupController();
