import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from '../../infrastructure/entities/user.entity';

export type User = InferSelectModel<typeof users>;

export type CreateUserDTO = Pick<InferInsertModel<typeof users>, 'age' | 'name' | 'phone'>;
