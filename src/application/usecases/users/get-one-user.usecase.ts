import { User } from '@domain/entities';
import { IGetOneUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

export class GetOneUserUseCase implements IGetOneUserUseCase {
    async execute(id: number): Promise<User> {
        const user = await db.select().from(UsersEntity).where(eq(UsersEntity.id, id));

        if (user.length === 0) throw new NotFoundError(`User with id: ${id}, not found`);

        return user[0];
    }
}
