import { DeleteUserUseCase } from '@application/usecases';
import { IDeleteUserUseCase, IGetOneUserUseCase } from '@domain/usecases';
import { makeGetOneUserUseCase } from './get-one-user.usecase.factory';

export const makeDeleteUserUseCase = (): IDeleteUserUseCase => {
    const getOneUserUseCase: IGetOneUserUseCase = makeGetOneUserUseCase();

    return new DeleteUserUseCase(getOneUserUseCase);
};
