import { Tag } from '../interface';

//@ts-ignore
const Database = require('../model/database');

class TagController {
  public get(name?: string): Tag[] {
    const tags = Database.read('tags') as Tag[];
    return name ? tags.filter(tag => tag.name === name) : tags;
  }

  public isExist(name: string): boolean {
    const [tag] = this.get(name);
    return !!tag;
  }

  public toggle(name: string, active: boolean) {
    const tags = this.get();
    tags.forEach(t => t.name === name && (t.active = active));
    Database.write('tags', tags);
  }

  public create(name: string) {
    const tags = this.get();
    const tag = { id: tags.length + 1, name, active: true };
    Database.write('tags', tags.unshift(tag));
    return tag;
  }

  public update(before: string, after: string) {
    const tags = this.get();
    tags.forEach(t => t.name === before && (t.name = after));
    Database.write('tags', tags);
  }

  public remove(name: string) {
    const tags = this.get();
    tags.forEach(t => t.name === name && (t.active = false));
    Database.write('tags', tags);
  }
}

module.exports = new TagController();
