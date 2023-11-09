import { UserWithoutPassword } from '@domain/entities';
import { IDeleteUserUseCase, IGetOneUserUseCase } from '@domain/usecases';
import { db } from '@infrastructure/config';
import { UsersEntity } from '@infrastructure/entities';
import { eq } from 'drizzle-orm';

export class DeleteUserUseCase implements IDeleteUserUseCase {
    constructor(private readonly getOneUserUseCase: IGetOneUserUseCase) {}

    async execute(id: number): Promise<void> {
        const user: UserWithoutPassword = await this.getOneUserUseCase.execute(id);

        await db.delete(UsersEntity).where(eq(UsersEntity.id, user.id));
    }
}
