import { CreateUserDTO, User } from '@domain/entities';

export interface ICreateUserUseCase {
    execute(body: CreateUserDTO): Promise<User>;
}
