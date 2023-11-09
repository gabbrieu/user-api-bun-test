import { db } from '@infrastructure/config';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

migrate(db, { migrationsFolder: 'drizzle' });

console.info('Migration ran successfully :)');
