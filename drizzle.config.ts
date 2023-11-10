import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/infrastructure/entities/*.entity.ts',
    out: './drizzle',
});
