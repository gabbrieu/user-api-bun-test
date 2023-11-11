import { IUserLoginDTO, UserWithoutPassword } from '@domain/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { UserSetup, createTestUserPayload } from '@test/shared';
import { ErrorResponse } from '@utils/errors.util';
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

describe('Login route', () => {
    const appTest = new UserRoutes(app);
    const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;
    let userMock: UserWithoutPassword;

    beforeAll(async () => {
        const userSetup: UserWithoutPassword = await UserSetup.createOneUserMock();
        userMock = userSetup;
    });

    afterAll(async () => {
        await UserSetup.deleteAllUsers();
        await appTest.app.stop();
    });

    it('should login the user', async () => {
        const sentBody: IUserLoginDTO = {
            email: userMock.email,
            password: createTestUserPayload.password,
        };

        const response: Response = await appTest.app.handle(
            new Request(baseURL + '/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const cookie: string = response.headers.getSetCookie()[0].split(';')[0];

        expect(response.status).toBe(204);
        expect(cookie).toBeString();
        expect(cookie).toContain('auth=');
    });

    it('should throw an UNAUTHORIZED_ERROR when the email is wrong', async () => {
        const sentBody: IUserLoginDTO = {
            email: 'wrong-email@gmail.com',
            password: createTestUserPayload.password,
        };

        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(401);
        expect(responseBody).toStrictEqual({ message: `Wrong credentials` });
    });

    it('should throw an UNAUTHORIZED_ERROR when the password is wrong', async () => {
        const sentBody: IUserLoginDTO = {
            email: userMock.email,
            password: 'wrong password',
        };

        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(401);
        expect(responseBody).toStrictEqual({ message: `Wrong credentials` });
    });

    it('should throw an UNAUTHORIZED_ERROR when the email and password are wrong', async () => {
        const sentBody: IUserLoginDTO = {
            email: 'wrong-email@gmail.com',
            password: 'wrong password',
        };

        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: ErrorResponse = await response.json<ErrorResponse>();

        expect(response.status).toBe(401);
        expect(responseBody).toStrictEqual({ message: `Wrong credentials` });
    });

    it('should throw a BAD_REQUEST_ERROR when the email format is wrong', async () => {
        const sentBody: IUserLoginDTO = {
            email: 'malformed email',
            password: createTestUserPayload.password,
        };

        const response: Response = await appTest.app.handle(
            new Request(baseURL + `/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sentBody),
            })
        );
        const responseBody: string = await response.text();

        expect(response.status).toBe(400);
        expect(responseBody).toContain(`Invalid body, 'email': Expected string to match 'email' format`);
    });
});
