import { IUpdateUserDTO, UserWithoutPassword } from '@domain/entities';
import { IGetOneUserUseCase, IUpdateUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { UseCaseError } from '@utils/errors.util';
import { eq } from 'drizzle-orm';

export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(private readonly getOneUserUseCase: IGetOneUserUseCase) {}

    async execute(id: number, body: IUpdateUserDTO): Promise<UserWithoutPassword> {
        try {
            const user: UserWithoutPassword = await this.getOneUserUseCase.execute(id);

            const updatedUser: UserWithoutPassword[] = await db
                .update(UsersEntity)
                .set({ ...body })
                .where(eq(UsersEntity.id, user.id))
                .returning({
                    id: UsersEntity.id,
                    name: UsersEntity.name,
                    age: UsersEntity.age,
                    email: UsersEntity.email,
                    phone: UsersEntity.phone,
                    createdAt: UsersEntity.createdAt,
                    updatedAt: UsersEntity.updatedAt,
                });

            return updatedUser[0];
        } catch (error) {
            throw new UseCaseError(error);
        }
    }
}
