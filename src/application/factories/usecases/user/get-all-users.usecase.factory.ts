import { GetAllUsersUseCase } from '@application/usecases';
import { IGetAllUsersUseCase } from '@domain/usecases';

export const makeGetAllUsersUseCase = (): IGetAllUsersUseCase => {
    return new GetAllUsersUseCase();
};
