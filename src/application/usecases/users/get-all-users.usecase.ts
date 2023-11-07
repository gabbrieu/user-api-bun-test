import { User } from '../../../domain/entities/user.entity.interface';
import { IGetAllUsersUseCase } from '../../../domain/usecases/user/get-all-users.usecase.interface';
import { db } from '../../../infrastructure/config/db';
import { users } from '../../../infrastructure/entities/user.entity';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
    async execute(): Promise<User[]> {
        return await db.select().from(users);
    }
}
