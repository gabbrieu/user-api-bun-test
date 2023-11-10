import { UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { IUserSetup, UserSetup } from '@test/shared';
import { afterEach, beforeAll, describe, expect, it } from 'bun:test';

describe('Get all users route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = 'http://localhost:3000/users';
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

    it('should get all users', async () => {
        const response: Response = await appTest.app.handle(new Request(baseURL, { headers: { Cookie: cookie } }));
        const responseBody: UserWithoutPassword[] = await response.json<UserWithoutPassword[]>();

        expect(response.status).toBe(200);
        expect(responseBody).toStrictEqual([userMock]);
    });
});
