import { makeUsersController } from '@application/factories';
import { UsersController } from '@presentation/controllers';
import { transformNumber } from '@utils/transform.util';
import { Context, UserValidation } from '@validations/user';
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
                .post('/', ({ body }) => userController.create(body), {
                    body: UserValidation.createUser(),
                })
                .get('/:id', ({ params }) => userController.getOne(params.id), {
                    params: UserValidation.getOneUser(),
                    transform: transformNumber,
                })
                .patch('/:id', ({ body, params }) => userController.update(Number(params.id), body), {
                    body: UserValidation.updateUser(Context.BODY),
                    params: UserValidation.updateUser(Context.PARAMS),
                    transform: transformNumber,
                })
        );
    }
}
