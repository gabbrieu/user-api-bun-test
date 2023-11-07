import { users } from '@infrastructure/entities';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;

export type CreateUserDTO = Pick<InferInsertModel<typeof users>, 'age' | 'name' | 'phone'>;
