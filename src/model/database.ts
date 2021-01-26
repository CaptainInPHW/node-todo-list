import { DatabaseKeys, DatabaseStructure } from '../interface';

const fs = require('fs');
const os = require('os');
const path = require('path');
const packageJson = require('../../package.json');

const dbPath = path.join(os.homedir(), packageJson.dbName);

class Database {
  initial() {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ tags: [], tasks: [], groups: [], levels: [] } as DatabaseStructure));
    }
  }

  public read<K extends DatabaseKeys>(key?: K) {
    const db = JSON.parse(fs.readFileSync(dbPath).toString());
    return key ? db[key] : db;
  }

  public write<K extends DatabaseKeys>(key: K, content: DatabaseStructure[K]) {
    const db = this.read();
    db[key] = content;
    const json = JSON.stringify(db);
    fs.writeFileSync(dbPath, json);
  }
}


module.exports = new Database();
