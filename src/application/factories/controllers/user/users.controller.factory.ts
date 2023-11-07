import { makeCreateUserUseCase, makeGetAllUsersUseCase } from '@application/factories';
import { ICreateUserUseCase, IGetAllUsersUseCase } from '@domain/usecases';
import { UsersController } from '@presentation/controllers';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();
    const createUserUseCase: ICreateUserUseCase = makeCreateUserUseCase();

    return new UsersController(getAllUsersUseCase, createUserUseCase);
};
