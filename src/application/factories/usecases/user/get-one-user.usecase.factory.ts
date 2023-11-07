import { GetOneUserUseCase } from '@application/usecases';
import { IGetOneUserUseCase } from '@domain/usecases';

export const makeGetOneUserUseCase = (): IGetOneUserUseCase => {
    return new GetOneUserUseCase();
};
