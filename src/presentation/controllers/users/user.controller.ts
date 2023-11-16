import { ICreateUserDTO, IUpdateUserDTO, IUserLoginDTO, JWTParams, UserWithoutPassword } from '@domain/entities';
import {
    ICreateUserUseCase,
    IDeleteUserUseCase,
    IGetAllUsersUseCase,
    IGetOneUserUseCase,
    IUpdateUserUseCase,
    IUserLoginUseCase,
} from '@domain/usecases';

export class UsersController {
    constructor(
        private readonly getAllUsersUseCase: IGetAllUsersUseCase,
        private readonly createUserUseCase: ICreateUserUseCase,
        private readonly getOneUserUseCase: IGetOneUserUseCase,
        private readonly updateUserUseCase: IUpdateUserUseCase,
        private readonly deleteUserUseCase: IDeleteUserUseCase,
        private readonly userLoginUseCase: IUserLoginUseCase
    ) {}

    async getAll(): Promise<UserWithoutPassword[]> {
        return await this.getAllUsersUseCase.execute();
    }

    async create(body: ICreateUserDTO): Promise<UserWithoutPassword> {
        return await this.createUserUseCase.execute(body);
    }

    async getOne(id: number): Promise<UserWithoutPassword> {
        return await this.getOneUserUseCase.execute(id);
    }

    async update(id: number, body: IUpdateUserDTO): Promise<UserWithoutPassword> {
        return await this.updateUserUseCase.execute(id, body);
    }

    async delete(id: number): Promise<void> {
        await this.deleteUserUseCase.execute(id);
    }

    async login(body: IUserLoginDTO, jwtParams: JWTParams): Promise<string> {
        const { jwt } = jwtParams;
        const loginResponse = await this.userLoginUseCase.execute(body);

        const authToken: string = await jwt.sign({ id: String(loginResponse.id), email: body.email });

        return authToken;
    }
}
