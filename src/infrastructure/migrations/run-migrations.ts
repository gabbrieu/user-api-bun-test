import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from '../config/db';

migrate(db, { migrationsFolder: 'drizzle' });
