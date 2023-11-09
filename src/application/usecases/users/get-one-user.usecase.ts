import { UserWithoutPassword } from '@domain/entities';
import { IGetOneUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';

export class GetOneUserUseCase implements IGetOneUserUseCase {
    async execute(id: number): Promise<UserWithoutPassword> {
        const user = await db
            .select({
                id: UsersEntity.id,
                name: UsersEntity.name,
                age: UsersEntity.age,
                email: UsersEntity.email,
                phone: UsersEntity.phone,
                createdAt: UsersEntity.createdAt,
                updatedAt: UsersEntity.updatedAt,
            })
            .from(UsersEntity)
            .where(eq(UsersEntity.id, id));

        if (user.length === 0) throw new NotFoundError(`User with id: ${id}, not found`);

        return user[0];
    }
}
