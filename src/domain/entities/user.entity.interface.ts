import { JWTPayloadSpec } from '@elysiajs/jwt';
import { UsersEntity } from '@infrastructure/entities';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof UsersEntity>;

export type UserWithoutPassword = Omit<User, 'password'>;

export type ICreateUserDTO = Pick<InferInsertModel<typeof UsersEntity>, 'age' | 'name' | 'phone' | 'email' | 'password'>;

export type IUpdateUserDTO = Pick<Partial<User>, 'age' | 'name' | 'phone'>;

export type IUserLoginDTO = Pick<User, 'email' | 'password'>;

export type JWTParams = {
    jwt: {
        readonly sign: (morePayload: Record<string, string> & JWTPayloadSpec) => Promise<string>;
        readonly verify: (jwt?: string) => Promise<false | (Record<string, string> & JWTPayloadSpec)>;
    };
};
