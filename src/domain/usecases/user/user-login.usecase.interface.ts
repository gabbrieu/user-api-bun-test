import { IUserLoginDTO, User } from '@domain/entities';

export interface IUserLoginUseCase {
    execute(body: IUserLoginDTO): Promise<IUserLoginDTOOutput>;
}

export interface IUserLoginDTOOutput extends Pick<User, 'id'> {}
