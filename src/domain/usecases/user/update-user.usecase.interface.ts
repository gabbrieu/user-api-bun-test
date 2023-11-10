import { UpdateUserDTO, UserWithoutPassword } from '@domain/entities';

export interface IUpdateUserUseCase {
    execute(id: number, body: UpdateUserDTO): Promise<UserWithoutPassword>;
}
