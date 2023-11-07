import { CreateUserDTO, User } from '@domain/entities';
import { ICreateUserUseCase, IGetAllUsersUseCase } from '@domain/usecases';

export class UsersController {
    constructor(
        private readonly getAllUsersUseCase: IGetAllUsersUseCase,
        private readonly createUserUseCase: ICreateUserUseCase,
        private readonly getOneUserUseCase
    ) {}

    async getAll(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }

    async create(body: CreateUserDTO): Promise<User> {
        return await this.createUserUseCase.execute(body);
    }

    async getOne(id: number): Promise<User> {
        return await this.getOneUserUseCase.execute();
    }
}
