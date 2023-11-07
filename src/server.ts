import { Elysia } from 'elysia';
import UserRoutes from './presentation/routes/user/user.route';

const app: Elysia = new Elysia();

new UserRoutes(app);
app.listen(3000);

console.log(`🦊 Elysia app is running at ${app.server?.hostname}:${app.server?.port}`);
