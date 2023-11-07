import { CreateUserDTO, User } from '@domain/entities';
import { ICreateUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { users } from '@infrastructure/entities';

export class CreateUserUseCase implements ICreateUserUseCase {
    async execute(body: CreateUserDTO): Promise<User> {
        const user = await db.insert(users).values(body).returning();

        return user[0];
    }
}
