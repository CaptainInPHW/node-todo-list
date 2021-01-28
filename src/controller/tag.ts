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
    const [rest, tag] = tags.reduce<[Tag[], Tag | undefined]>((rest, tag) => (
      tag.name === name ? [rest[0].concat(tag), rest[1]] : [rest[0], tag]
    ), [[], undefined]);
    tag!.active = active;
    Database.write('tags', rest.concat(tag!));
  }

  public create(name: string) {
    const tags = this.get();
    Database.write('tags', tags.concat({ id: tags.length + 1, name, active: true }));
  }

  public update(before: string, after: string) {
    const [tag] = this.get(before);
    const tags = this.get()
      .filter(t => t.name !== before)
      .concat({ ...tag, name: after });
    Database.write('tags', tags);
  }

  public remove(name: string) {
    const tags = this.get();
    const [rest, tag] = tags.reduce<[Tag[], Tag | undefined]>((rest, tag) => (
      tag.name === name ? [rest[0].concat(tag), rest[1]] : [rest[0], tag]
    ), [[], undefined]);
    tag!.active = false;
    Database.write('tags', rest.concat(tag!));
  }
}

module.exports = new TagController();
