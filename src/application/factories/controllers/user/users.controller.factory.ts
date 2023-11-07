import { makeCreateUserUseCase, makeGetAllUsersUseCase, makeGetOneUserUseCase } from '@application/factories';
import { ICreateUserUseCase, IGetAllUsersUseCase, IGetOneUserUseCase } from '@domain/usecases';
import { UsersController } from '@presentation/controllers';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();
    const createUserUseCase: ICreateUserUseCase = makeCreateUserUseCase();
    const getOneUserUseCase: IGetOneUserUseCase = makeGetOneUserUseCase();

    return new UsersController(getAllUsersUseCase, createUserUseCase, getOneUserUseCase);
};
