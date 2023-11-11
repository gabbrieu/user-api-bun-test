import { IUserLoginDTO, User } from '@domain/entities';
import { IUserLoginDTOOutput, IUserLoginUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { UnauthorizedError, UseCaseError } from '@utils/errors.util';
import { password } from 'bun';
import { eq } from 'drizzle-orm';

export class UserLoginUseCase implements IUserLoginUseCase {
    async execute(body: IUserLoginDTO): Promise<IUserLoginDTOOutput> {
        try {
            const { email: loginEmail, password: loginPassword } = body;

            const user: User | undefined = (await db.select().from(UsersEntity).where(eq(UsersEntity.email, loginEmail))).at(0);

            if (!user) throw new UnauthorizedError('Wrong credentials');

            const isCorrectPassword: boolean = await password.verify(loginPassword, user.password, 'argon2i');

            if (!isCorrectPassword) throw new UnauthorizedError('Wrong credentials');

            return { id: user.id };
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
