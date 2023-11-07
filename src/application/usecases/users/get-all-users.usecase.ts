import { User } from '@domain/entities';
import { IGetAllUsersUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
    async execute(): Promise<User[]> {
        return await db.select().from(UsersEntity);
    }
}
