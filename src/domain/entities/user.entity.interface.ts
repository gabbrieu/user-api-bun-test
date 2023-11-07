import { UsersEntity } from '@infrastructure/entities';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof UsersEntity>;

export type CreateUserDTO = Pick<InferInsertModel<typeof UsersEntity>, 'age' | 'name' | 'phone'>;

export type UpdateUserDTO = Pick<Partial<User>, 'age' | 'name' | 'phone'>;
