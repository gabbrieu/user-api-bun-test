import { UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, beforeEach, describe, expect, it } from 'bun:test';

describe('Delete user route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;
    let userMock: UserWithoutPassword;
    let cookie: string;

    beforeEach(async () => {
        const userSetup: IUserSetup = await UserSetup.setup();
        userMock = userSetup.userMock;
        cookie = userSetup.cookie;
    });

    afterAll(async () => {
        await UserSetup.deleteAllUsers();
        await appTest.app.stop();
    });

    it('should delete the user', async () => {
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${userMock.id}`, { method: 'DELETE', headers: { cookie: cookie } })
        );

        expect(response.status).toBe(204);
    });

    it('should throw a NOT_FOUND_ERROR when the user does not exist', async () => {
        const idThatNotExists: number = 9120912;
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${idThatNotExists}`, { method: 'DELETE', headers: { cookie: cookie } })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(404);
        expect(responseBody).toStrictEqual({ message: `User with id: ${idThatNotExists}, not found` });
    });
});
