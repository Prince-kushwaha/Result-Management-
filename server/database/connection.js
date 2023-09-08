import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const file = './database/db.json';
const adapter = new JSONFile(file);
const defaultData = { };
export const db = new Low(adapter, defaultData);

