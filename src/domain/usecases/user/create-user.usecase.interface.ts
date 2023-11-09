import { CreateUserDTO, UserWithoutPassword } from '@domain/entities';

export interface ICreateUserUseCase {
    execute(body: CreateUserDTO): Promise<UserWithoutPassword>;
}
