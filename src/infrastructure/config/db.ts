import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqliteDatabase: Database = new Database('./db/database.sqlite');
export const db = drizzle(sqliteDatabase);
