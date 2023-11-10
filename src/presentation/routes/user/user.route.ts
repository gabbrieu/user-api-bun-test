import { makeUsersController } from '@application/factories';
import { UsersController } from '@presentation/controllers';
import { AppType } from '@server';
import { isAuthenticated } from '@utils/auth.util';
import { transformNumber } from '@utils/transform.util';
import { Context, UserValidation } from '@validations/user';

export class UserRoutes {
    public readonly app: AppType;

    constructor(app: AppType) {
        this.app = app;

        this.initRoutes();
    }

    private initRoutes() {
        const userController: UsersController = makeUsersController();

        this.app.group('/users', (app) =>
            app
                .post('/login', async ({ body, jwt, setCookie }) => await userController.login(body, { jwt, setCookie }), {
                    body: UserValidation.userLogin(),
                })
                .post('/', async ({ body }) => await userController.create(body), {
                    body: UserValidation.createUser(),
                })
                .use(isAuthenticated)
                .get('/', async () => await userController.getAll())
                .get('/:id', async ({ params }) => await userController.getOne(params.id), {
                    params: UserValidation.simpleIdParam(),
                    transform: transformNumber,
                })
                .patch('/:id', async ({ body, params }) => await userController.update(params.id, body), {
                    body: UserValidation.updateUser(Context.BODY),
                    params: UserValidation.updateUser(Context.PARAMS),
                    transform: transformNumber,
                })
                .delete(
                    '/:id',
                    async ({ params, set }) => {
                        set.status = 'No Content';

                        await userController.delete(params.id);
                    },
                    { params: UserValidation.simpleIdParam(), transform: transformNumber }
                )
        );
    }
}
