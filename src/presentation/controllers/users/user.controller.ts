import { CreateUserDTO, User } from '../../../domain/entities/user.entity.interface';
import { ICreateUserUseCase } from '../../../domain/usecases/user/create-user.usecase.interface';
import { IGetAllUsersUseCase } from '../../../domain/usecases/user/get-all-users.usecase.interface';

export class UsersController {
    constructor(private readonly getAllUsersUseCase: IGetAllUsersUseCase, private readonly createUserUseCase: ICreateUserUseCase) {}

    async getAll(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }

    async create(body: CreateUserDTO): Promise<User> {
        return await this.createUserUseCase.execute(body);
    }
}
