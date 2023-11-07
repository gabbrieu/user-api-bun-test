import { makeUsersController } from '@application/factories';
import { CreateUserDTO } from '@domain/entities';
import { UsersController } from '@presentation/controllers';
import { Elysia } from 'elysia';

export class UserRoutes {
    private readonly app: Elysia;

    constructor(app: Elysia) {
        this.app = app;

        this.initRoutes();
    }

    private initRoutes() {
        const userController: UsersController = makeUsersController();

        this.app.group('/users', (app) =>
            app
                .get('/', () => userController.getAll())
                .post('/', (context) => userController.create(context.body as CreateUserDTO))
                .get('/:id', (context) => userController.getOne(+context.params.id))
        );
    }
}
