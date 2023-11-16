import { AppType } from '@server';
import { UnauthorizedError } from './errors.util';

export const isAuthenticated = (app: AppType) =>
    app.derive(async ({ cookie, jwt, set }) => {
        if (!cookie!.auth) {
            set.status = 401;
            throw new UnauthorizedError('Missing auth cookie');
        }

        const userJWT = await jwt.verify(cookie.auth.value);
        if (!userJWT) {
            set.status = 401;
            throw new UnauthorizedError('JWT invalid');
        }

        userJWT.id = +userJWT.id as any;
        return { userJWT };
    });
