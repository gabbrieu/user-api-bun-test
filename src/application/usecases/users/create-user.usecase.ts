import { CreateUserDTO, UserWithoutPassword } from '@domain/entities';
import { ICreateUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { password } from 'bun';

export class CreateUserUseCase implements ICreateUserUseCase {
    async execute(body: CreateUserDTO): Promise<UserWithoutPassword> {
        body.password = await password.hash(body.password, {
            algorithm: 'argon2i',
        });

        const user = await db.insert(UsersEntity).values(body).returning({
            id: UsersEntity.id,
            name: UsersEntity.name,
            email: UsersEntity.email,
            phone: UsersEntity.phone,
            age: UsersEntity.age,
            createdAt: UsersEntity.createdAt,
            updatedAt: UsersEntity.updatedAt,
        });

        return user[0];
    }
}
