import type { Config } from 'drizzle-kit';

export default {
    schema: './src/infrastructure/entities/*.entity.ts',
    driver: 'better-sqlite',
    out: './drizzle',
} satisfies Config;
