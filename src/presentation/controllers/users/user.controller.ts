import { CreateUserDTO, UpdateUserDTO, User } from '@domain/entities';
import { ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetOneUserUseCase, IUpdateUserUseCase } from '@domain/usecases';

export class UsersController {
    constructor(
        private readonly getAllUsersUseCase: IGetAllUsersUseCase,
        private readonly createUserUseCase: ICreateUserUseCase,
        private readonly getOneUserUseCase: IGetOneUserUseCase,
        private readonly updateUserUseCase: IUpdateUserUseCase,
        private readonly deleteUserUseCase: IDeleteUserUseCase
    ) {}

    async getAll(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }

    async create(body: CreateUserDTO): Promise<User> {
        return await this.createUserUseCase.execute(body);
    }

    async getOne(id: number): Promise<User> {
        return await this.getOneUserUseCase.execute(id);
    }

    async update(id: number, body: UpdateUserDTO): Promise<User> {
        return await this.updateUserUseCase.execute(id, body);
    }

    async delete(id: number): Promise<void> {
        await this.deleteUserUseCase.execute(id);
    }
}
