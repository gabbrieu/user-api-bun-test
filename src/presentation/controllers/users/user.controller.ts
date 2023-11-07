import { User } from '../../../domain/entities/user.entity.interface';
import { IGetAllUsersUseCase } from '../../../domain/usecases/user/get-all-users.usecase.interface';

export class UsersController {
    constructor(private readonly getAllUsersUseCase: IGetAllUsersUseCase) {}

    async getAllUsers(): Promise<User[]> {
        return await this.getAllUsersUseCase.execute();
    }
}
