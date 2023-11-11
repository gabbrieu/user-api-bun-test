import { ICreateUserDTO, IUserLoginDTO, UserWithoutPassword } from '@domain/entities';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { UserRoutes } from '@presentation/routes';
import { app } from '@server';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const createTestUserPayload: ICreateUserDTO = {
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
                    body: JSON.stringify(createTestUserPayload),
                    headers: { 'Content-Type': 'application/json' },
                })
            )
            .then((res) => res.json());

        const loginResponse = await appTest.app.handle(
            new Request(baseURL + '/login', {
                method: 'POST',
                body: JSON.stringify({ email: createTestUserPayload.email, password: createTestUserPayload.password } as IUserLoginDTO),
                headers: { 'Content-Type': 'application/json' },
            })
        );

        const cookie: string = loginResponse.headers.getSetCookie()[0].split(';')[0];

        return {
            userMock,
            cookie,
        };
    }

    static async createOneUserMock(): Promise<UserWithoutPassword> {
        const appTest = new UserRoutes(app);
        const baseURL: string = `${app.server?.hostname}:${app.server?.port}/users`;

        migrate(db, { migrationsFolder: 'drizzle' });

        const userMock: UserWithoutPassword = await appTest.app
            .handle(
                new Request(baseURL, {
                    method: 'POST',
                    body: JSON.stringify(createTestUserPayload),
                    headers: { 'Content-Type': 'application/json' },
                })
            )
            .then((res) => res.json());

        return userMock;
    }

    static async deleteAllUsers() {
        await db.delete(UsersEntity);
        db.run(sql`DELETE FROM sqlite_sequence`);
    }
}
