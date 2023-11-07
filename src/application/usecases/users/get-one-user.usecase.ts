import { User } from '@domain/entities';
import { IGetOneUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { users } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

export class GetOneUserUseCase implements IGetOneUserUseCase {
    async execute(id: number): Promise<User> {
        const user = await db.select().from(users).where(eq(users.id, id));

        if (user.length === 0) throw new NotFoundError(`User with id: ${id}, not found`);

        return user[0];
    }
}
