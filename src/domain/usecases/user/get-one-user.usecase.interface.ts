import { User } from '@domain/entities';

export interface IGetOneUserUseCase {
    execute(id: number): Promise<User>;
}
