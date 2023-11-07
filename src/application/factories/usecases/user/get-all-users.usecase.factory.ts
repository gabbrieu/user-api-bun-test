import { IGetAllUsersUseCase } from '../../../../domain/usecases/user/get-all-users.usecase.interface';
import { GetAllUsersUseCase } from '../../../usecases/users/get-all-users.usecase';

export const makeGetAllUsersUseCase = (): IGetAllUsersUseCase => {
    return new GetAllUsersUseCase();
};
