import { CookieRequest } from '@elysiajs/cookie';
import { JWTPayloadSpec } from '@elysiajs/jwt';
import { UsersEntity } from '@infrastructure/entities';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof UsersEntity>;

export type UserWithoutPassword = Omit<User, 'password'>;

export type CreateUserDTO = Pick<InferInsertModel<typeof UsersEntity>, 'age' | 'name' | 'phone' | 'email' | 'password'>;

export type UpdateUserDTO = Pick<Partial<User>, 'age' | 'name' | 'phone'>;

export type UserLoginDTO = Pick<User, 'email' | 'password'>;

export type JWTParams = {
    setCookie: CookieRequest['setCookie'];
    jwt: {
        readonly sign: (morePayload: Record<string, string> & JWTPayloadSpec) => Promise<string>;
        readonly verify: (jwt?: string) => Promise<false | (Record<string, string> & JWTPayloadSpec)>;
    };
};
