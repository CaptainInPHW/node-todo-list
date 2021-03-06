import { Tag } from '../interface';

const chalk = require('chalk');

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

  public create(name: string): Tag {
    const tags = this.get();
    let tag = tags.find(tag => tag.name === name);

    if (tag) {
      // throw an error when tag is exist and active
      if (tag.active) {
        throw new Error(`Tag ${chalk.green(tag.name)} is already exist.`);
      }

      // otherwise active the tag
      tags.forEach(tag => tag.name === name && (tag.active = true));
      Database.write('tags', tags);
      return tag;
    }

    // create a new tag
    tag = { id: tags.length + 1, name, active: true };
    Database.write('tags', tags.concat(tag));
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
