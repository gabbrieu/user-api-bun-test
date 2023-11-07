import { InferSelectModel } from 'drizzle-orm';
import { users } from '../../infrastructure/entities/user.entity';

export type User = InferSelectModel<typeof users>;
