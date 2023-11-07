import { eq } from 'drizzle-orm';
import { CreateUserDTO, User } from '../../../domain/entities/user.entity.interface';
import { ICreateUserUseCase } from '../../../domain/usecases/user/create-user.usecase.interface';
import { db } from '../../../infrastructure/config/db';
import { users } from '../../../infrastructure/entities/user.entity';

export class CreateUserUseCase implements ICreateUserUseCase {
    async execute(body: CreateUserDTO): Promise<User> {
        const user = await db.insert(users).values(body).returning();

        return user[0];
    }
}
