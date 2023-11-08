import { CreateUserDTO, User } from '@domain/entities';

export interface ICreateUserUseCase {
    execute(body: CreateUserDTO): Promise<ICreateUserDTOOutput>;
}

export interface ICreateUserDTOOutput extends Pick<User, 'id' | 'age' | 'email' | 'name' | 'phone' | 'createdAt' | 'updatedAt'> {}
