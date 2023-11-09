import { UserWithoutPassword } from '@domain/entities';

export interface IGetOneUserUseCase {
    execute(id: number): Promise<UserWithoutPassword>;
}
