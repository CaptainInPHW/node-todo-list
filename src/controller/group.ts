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
    const [rest, group] = groups.reduce<[Group[], Group | undefined]>((rest, group) => (
      group.name === name ? [rest[0].concat(group), rest[1]] : [rest[0], group]
    ), [[], undefined]);
    group!.active = active;
    Database.write('groups', rest.concat(group!));
  }

  public create(name: string) {
    const groups = this.get();
    Database.write('groups', groups.concat({ id: groups.length + 1, name, active: true }));
  }

  public update(before: string, after: string) {
    const [group] = this.get(before);
    const groups = this.get()
      .filter(t => t.name !== before)
      .concat({ ...group, name: after });
    Database.write('groups', groups);
  }

  public remove(name: string) {
    const groups = this.get();
    const [rest, group] = groups.reduce<[Group[], Group | undefined]>((rest, group) => (
      group.name === name ? [rest[0].concat(group), rest[1]] : [rest[0], group]
    ), [[], undefined]);
    group!.active = false;
    Database.write('groups', rest.concat(group!));
  }
}

module.exports = new GroupController();
