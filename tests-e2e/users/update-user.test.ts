import { IUpdateUserDTO, UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

describe('Update one user route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;
    let userMock: UserWithoutPassword;
    let cookie: string;

    beforeAll(async () => {
        const userSetup: IUserSetup = await UserSetup.setup();
        userMock = userSetup.userMock;
        cookie = userSetup.cookie;
    });

    afterAll(async () => {
        await UserSetup.deleteAllUsers();
        await appTest.app.stop();
    });

    it('should update one user', async () => {
        const sentBody: IUpdateUserDTO = {
            age: 100,
            name: 'Update user mock',
        };
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${userMock.id}`, {
                method: 'PATCH',
                headers: { cookie: cookie, 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: UserWithoutPassword = await response.json<UserWithoutPassword>();

        expect(response.status).toBe(200);
        expect(responseBody).toStrictEqual({ ...userMock, age: 100, name: 'Update user mock' } as UserWithoutPassword);
    });

    it('should throw a NOT_FOUND_ERROR when the user does not exists', async () => {
        const idThatNotExists: number = 9120912;
        const sentBody: IUpdateUserDTO = {
            name: 'Wrong user',
        };
        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/${idThatNotExists}`, {
                method: 'PATCH',
                headers: { cookie: cookie, 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(404);
        expect(responseBody).toStrictEqual({ message: `User with id: ${idThatNotExists}, not found` });
    });
});
