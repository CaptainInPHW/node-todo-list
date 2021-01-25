import { DatabaseStructure } from './interface';

const fs = require('fs');
const os = require('os');
const path = require('path');
const packageJson = require('../package.json');

const dbPath = path.join(os.homedir(), packageJson.dbName);

function initial() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ tags: [], tasks: [], groups: [], levels: [] } as DatabaseStructure));
  }
}

function readDatabase() {
  return JSON.parse(fs.readFileSync(dbPath).toString());
}

function writeDatabase(task: Record<string, unknown>, taskStatus: 'todo' | 'done') {
  console.log(task, taskStatus);
  // const jsonContent = JSON.stringify(task);
  // fs.writeFileSync('./.db.json', jsonContent);
}

module.exports = {
  initial,
  readDatabase,
  writeDatabase
};
