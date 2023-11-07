import { CreateUserDTO, User } from '../../entities/user.entity.interface';

export interface ICreateUserUseCase {
    execute(body: CreateUserDTO): Promise<User>;
}
