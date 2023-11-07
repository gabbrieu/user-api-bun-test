import { UpdateUserDTO, User } from '@domain/entities';
import { IGetOneUserUseCase, IUpdateUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';

export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(private readonly getOneUserUseCase: IGetOneUserUseCase) {}

    async execute(id: number, body: UpdateUserDTO): Promise<User> {
        const user: User = await this.getOneUserUseCase.execute(id);

        const updatedUser: User[] = await db
            .update(UsersEntity)
            .set({ ...body })
            .where(eq(UsersEntity.id, user.id))
            .returning();

        return updatedUser[0];
    }
}
