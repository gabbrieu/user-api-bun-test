import { ICreateUserDTO, UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { UserSetup } from '@test/shared';
import { afterAll, afterEach, describe, expect, it } from 'bun:test';

describe('Create user route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;

    afterEach(async () => {
        await UserSetup.deleteAllUsers();
    });

    afterAll(async () => {
        await appTest.app.stop();
    });

    it('should create the user', async () => {
        const sentBody: ICreateUserDTO = {
            age: 20,
            email: 'test@gmail.com',
            name: 'userMock',
            password: 'test123',
        };
        const response: Response = await appTest.app.handle(
            new Request(baseURL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(sentBody) })
        );
        const responseBody: UserWithoutPassword = await response.json<UserWithoutPassword>();
        const { password, ...sentBodyWithoutPassword } = sentBody;

        expect(response.status).toBe(201);
        expect(responseBody).toMatchObject({ ...sentBodyWithoutPassword, id: 1 });
    });

    it('should throw a CONFLICT_ERROR when the email is already being used', async () => {
        const userCreated: UserWithoutPassword = await UserSetup.createOneUserMock();

        const sentBody: ICreateUserDTO = {
            age: 20,
            email: userCreated.email,
            name: 'userMock',
            password: 'test123',
        };
        const response: Response = await appTest.app.handle(
            new Request(baseURL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(sentBody) })
        );
        const responseBody: UserWithoutPassword = await response.json<UserWithoutPassword>();

        expect(response.status).toBe(409);
        expect(responseBody).toStrictEqual({ message: 'User with this email already exists' });
    });
});
