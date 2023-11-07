import { Elysia } from 'elysia';
import { makeUsersController } from '../../../application/factories/controllers/user/users.controller.factory';
import { UsersController } from '../../controllers/users/user.controller';

export default class UserRoutes {
    private readonly app: Elysia;

    constructor(app: Elysia) {
        this.app = app;

        this.initRoutes();
    }

    private initRoutes() {
        const userController: UsersController = makeUsersController();

        this.app.group('/users', (app) => app.get('/', () => userController.getAllUsers()));
    }
}
