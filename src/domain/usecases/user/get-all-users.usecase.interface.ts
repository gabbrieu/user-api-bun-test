import { User } from '@domain/entities';

export interface IGetAllUsersUseCase {
    execute(): Promise<User[]>;
}
