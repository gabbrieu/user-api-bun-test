import {
    makeCreateUserUseCase,
    makeDeleteUserUseCase,
    makeGetAllUsersUseCase,
    makeGetOneUserUseCase,
    makeUpdateUserUseCase,
} from '@application/factories';
import { ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetOneUserUseCase, IUpdateUserUseCase } from '@domain/usecases';
import { UsersController } from '@presentation/controllers';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();
    const createUserUseCase: ICreateUserUseCase = makeCreateUserUseCase();
    const getOneUserUseCase: IGetOneUserUseCase = makeGetOneUserUseCase();
    const updateUserUseCase: IUpdateUserUseCase = makeUpdateUserUseCase();
    const deleteUserUseCase: IDeleteUserUseCase = makeDeleteUserUseCase();

    return new UsersController(getAllUsersUseCase, createUserUseCase, getOneUserUseCase, updateUserUseCase, deleteUserUseCase);
};
