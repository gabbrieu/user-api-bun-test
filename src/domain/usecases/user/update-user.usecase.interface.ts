import { UpdateUserDTO, User } from '@domain/entities';

export interface IUpdateUserUseCase {
    execute(id: number, body: UpdateUserDTO): Promise<User>;
}
