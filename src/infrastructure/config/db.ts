import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqliteDatabase: Database = Bun.env.NODE_ENV === 'test' ? new Database(':memory:') : new Database('./db/database.sqlite');
export const db = drizzle(sqliteDatabase);
