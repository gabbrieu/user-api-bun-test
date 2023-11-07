import { IGetAllUsersUseCase } from '../../../../domain/usecases/user/get-all-users.usecase.interface';
import { UsersController } from '../../../../presentation/controllers/users/user.controller';
import { makeGetAllUsersUseCase } from '../../usecases/user/get-all-users.usecase.factory';

export const makeUsersController = () => {
    const getAllUsersUseCase: IGetAllUsersUseCase = makeGetAllUsersUseCase();

    return new UsersController(getAllUsersUseCase);
};
