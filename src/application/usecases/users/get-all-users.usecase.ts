import { UserWithoutPassword } from '@domain/entities';
import { IGetAllUsersUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
    async execute(): Promise<UserWithoutPassword[]> {
        return await db
            .select({
                id: UsersEntity.id,
                name: UsersEntity.name,
                age: UsersEntity.age,
                email: UsersEntity.email,
                phone: UsersEntity.phone,
                createdAt: UsersEntity.createdAt,
                updatedAt: UsersEntity.updatedAt,
            })
            .from(UsersEntity);
    }
}
