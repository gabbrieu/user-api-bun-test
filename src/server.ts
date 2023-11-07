import { UserRoutes } from '@presentation/routes';
import { Elysia } from 'elysia';

const app: Elysia = new Elysia();

new UserRoutes(app);
app.listen(3000);

console.log(`🦊 Elysia app is running at ${app.server?.hostname}:${app.server?.port}`);
