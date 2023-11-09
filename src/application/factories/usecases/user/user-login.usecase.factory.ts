import { UserLoginUseCase } from '@application/usecases';
import { IUserLoginUseCase } from '@domain/usecases';

export const makeUserLoginUseCase = (): IUserLoginUseCase => {
    return new UserLoginUseCase();
};
