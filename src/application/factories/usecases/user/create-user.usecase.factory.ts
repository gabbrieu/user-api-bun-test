import { CreateUserUseCase } from '@application/usecases';
import { ICreateUserUseCase } from '@domain/usecases';

export const makeCreateUserUseCase = (): ICreateUserUseCase => {
    return new CreateUserUseCase();
};
