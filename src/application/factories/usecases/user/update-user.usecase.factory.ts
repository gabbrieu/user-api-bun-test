import { UpdateUserUseCase } from '@application/usecases';
import { IGetOneUserUseCase, IUpdateUserUseCase } from '@domain/usecases';
import { makeGetOneUserUseCase } from './get-one-user.usecase.factory';

export const makeUpdateUserUseCase = (): IUpdateUserUseCase => {
    const getOneUserUseCase: IGetOneUserUseCase = makeGetOneUserUseCase();

    return new UpdateUserUseCase(getOneUserUseCase);
};
