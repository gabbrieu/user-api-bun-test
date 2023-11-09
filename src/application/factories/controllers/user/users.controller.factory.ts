import {
    makeCreateUserUseCase,
    makeDeleteUserUseCase,
    makeGetAllUsersUseCase,
    makeGetOneUserUseCase,
    makeUpdateUserUseCase,
    makeUserLoginUseCase,
} from '@application/factories';
import {
    ICreateUserUseCase,
    IDeleteUserUseCase,
    IGetAllUsersUseCase,
    IGetOneUserUseCase,
    IUpdateUserUseCase,
    IUserLoginUseCase,
} from '@domain/usecases';
import { UsersController } from '@presentation/controllers';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();
    const createUserUseCase: ICreateUserUseCase = makeCreateUserUseCase();
    const getOneUserUseCase: IGetOneUserUseCase = makeGetOneUserUseCase();
    const updateUserUseCase: IUpdateUserUseCase = makeUpdateUserUseCase();
    const deleteUserUseCase: IDeleteUserUseCase = makeDeleteUserUseCase();
    const userLoginUseCase: IUserLoginUseCase = makeUserLoginUseCase();

    return new UsersController(
        getAllUsersUseCase,
        createUserUseCase,
        getOneUserUseCase,
        updateUserUseCase,
        deleteUserUseCase,
        userLoginUseCase
    );
};
