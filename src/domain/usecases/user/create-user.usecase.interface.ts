import { ICreateUserDTO, UserWithoutPassword } from '@domain/entities';

export interface ICreateUserUseCase {
    execute(body: ICreateUserDTO): Promise<UserWithoutPassword>;
}
