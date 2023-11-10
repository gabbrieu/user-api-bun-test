import { CreateUserDTO, UserLoginDTO, UserWithoutPassword } from '@domain/entities';
import { db } from '@infrastructure/config';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const createUserPayload: CreateUserDTO = {
    name: 'test',
    age: 24,
    phone: '31986671638',
    email: 'test@gmail.com',
    password: 'test123',
};

export interface IUserSetup {
    userMock: UserWithoutPassword;
    cookie: string;
}

export abstract class UserSetup {
    static async setup(): Promise<IUserSetup> {
        const appTest = new UserRoutes(app);
        const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;

        migrate(db, { migrationsFolder: 'drizzle' });

        const userMock: UserWithoutPassword = await appTest.app
            .handle(
                new Request(baseURL, {
                    method: 'POST',
                    body: JSON.stringify(createUserPayload),
                    headers: { 'Content-Type': 'application/json' },
                })
            )
            .then((res) => res.json());

        const loginResponse = await appTest.app.handle(
            new Request(baseURL + '/login', {
                method: 'POST',
                body: JSON.stringify({ email: createUserPayload.email, password: createUserPayload.password } as UserLoginDTO),
                headers: { 'Content-Type': 'application/json' },
            })
        );

        const cookie: string = loginResponse.headers.getSetCookie()[0].split(';')[0];

        return {
            userMock,
            cookie,
        };
    }
}
