import { IUpdateUserDTO, UserWithoutPassword } from '@domain/entities';

export interface IUpdateUserUseCase {
    execute(id: number, body: IUpdateUserDTO): Promise<UserWithoutPassword>;
}
