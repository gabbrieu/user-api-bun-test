import { ICreateUserUseCase } from '../../../../domain/usecases/user/create-user.usecase.interface';
import { IGetAllUsersUseCase } from '../../../../domain/usecases/user/get-all-users.usecase.interface';
import { UsersController } from '../../../../presentation/controllers/users/user.controller';
import { makeCreateUserUseCase } from '../../usecases/user/create-user.usecase.factory';
import { makeGetAllUsersUseCase } from '../../usecases/user/get-all-users.usecase.factory';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();
    const createUserUseCase: ICreateUserUseCase = makeCreateUserUseCase();

    return new UsersController(getAllUsersUseCase, createUserUseCase);
};
