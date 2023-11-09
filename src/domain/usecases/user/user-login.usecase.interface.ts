import { User, UserLoginDTO } from '@domain/entities';

export interface IUserLoginUseCase {
    execute(body: UserLoginDTO): Promise<IUserLoginDTOOutput>;
}

export interface IUserLoginDTOOutput extends Pick<User, 'id'> {}
