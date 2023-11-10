import cookie from '@elysiajs/cookie';
import jwt from '@elysiajs/jwt';
import { UserRoutes } from '@presentation/routes';
import { ConflictError, ErrorResponse, UnauthorizedError } from '@utils/errors.util';
import { Elysia } from 'elysia';

export const setup = new Elysia({ name: 'setup' }); // Reserved to use only state and decorate chained methods to apply type to all submodules. https://elysiajs.com/patterns/dependency-injection.html#dependency-injection
export const app = new Elysia()
    .use(setup)
    .error({
        UNAUTHORIZED_ERROR: UnauthorizedError,
        CONFLICT_ERROR: ConflictError,
    })
    .onError(({ code, error, set }) => {
        switch (code) {
            case 'NOT_FOUND':
            case 'CONFLICT_ERROR':
            case 'UNAUTHORIZED_ERROR': {
                set.status = error.status;
                return { message: error.message } as ErrorResponse;
            }
        }
    })
    .use(
        jwt({
            name: 'jwt',
            secret: Bun.env.JWT_SECRET || 'super_secret',
            exp: '2d',
        })
    )
    .use(cookie());

new UserRoutes(app);

app.listen(Bun.env.PORT || 3000);

console.log(`🦊 Elysia app is running at ${app.server?.hostname}:${app.server?.port}`);

export type AppType = typeof app;
