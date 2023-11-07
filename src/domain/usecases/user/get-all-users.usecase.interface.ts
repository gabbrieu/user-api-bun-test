import { User } from '../../entities/user.entity.interface';

export interface IGetAllUsersUseCase {
    execute(): Promise<User[]>;
}
