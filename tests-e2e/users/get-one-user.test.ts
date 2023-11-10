import { UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'bun:test';

describe('Get one user route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;
    let userMock: UserWithoutPassword;
    let cookie: string;

    beforeAll(async () => {
        const userSetup: IUserSetup = await UserSetup.setup();
        userMock = userSetup.userMock;
        cookie = userSetup.cookie;
    });

    afterEach(async () => {
        await appTest.app.stop();
    });

    afterAll(async () => {
        await UserSetup.deleteAllUsers();
    });

    it('should get one user', async () => {
        const response: Response = await appTest.app.handle(new Request(baseURL + `/${userMock.id}`, { headers: { Cookie: cookie } }));
        const responseBody: UserWithoutPassword = await response.json<UserWithoutPassword>();

        expect(response.status).toBe(200);
        expect(responseBody).toStrictEqual(userMock);
    });

    it('should throw a NOT_FOUND_ERROR when the user does not exists', async () => {
        const idThatNotExists: number = 9120912;
        const response: Response = await appTest.app.handle(new Request(baseURL + `/${idThatNotExists}`, { headers: { Cookie: cookie } }));
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(404);
        expect(responseBody).toStrictEqual({ message: `User with id: ${idThatNotExists}, not found` });
    });
});
