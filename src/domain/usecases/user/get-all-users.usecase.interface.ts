import { UserWithoutPassword } from '@domain/entities';

export interface IGetAllUsersUseCase {
    execute(): Promise<UserWithoutPassword[]>;
}
