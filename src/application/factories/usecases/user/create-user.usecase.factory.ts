import { ICreateUserUseCase } from '../../../../domain/usecases/user/create-user.usecase.interface';
import { CreateUserUseCase } from '../../../usecases/users/create-user.usecase';

export const makeCreateUserUseCase = (): ICreateUserUseCase => {
    return new CreateUserUseCase();
};
