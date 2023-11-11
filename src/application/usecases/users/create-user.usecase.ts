import { ICreateUserDTO, UserWithoutPassword } from '@domain/entities';
import { ICreateUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { ConflictError, UseCaseError } from '@utils/errors.util';
import { password } from 'bun';
import { eq } from 'drizzle-orm';

export class CreateUserUseCase implements ICreateUserUseCase {
    async execute(body: ICreateUserDTO): Promise<UserWithoutPassword> {
        try {
            body.password = await password.hash(body.password, {
                algorithm: 'argon2i',
            });

            const emailAlreadyExist = (
                await db.select({ id: UsersEntity.id }).from(UsersEntity).where(eq(UsersEntity.email, body.email))
            ).at(0);

            if (emailAlreadyExist) throw new ConflictError('User with this email already exists');

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
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
