import { InternalServerError, NotFoundError } from 'elysia';

export class UnauthorizedError extends Error {
    public status: number = 401;

    constructor(public message: string) {
        super(message);
    }
}

export class ConflictError extends Error {
    public status: number = 409;

    constructor(public message: string) {
        super(message);
    }
}

export class UseCaseError {
    constructor(error: any) {
        const message: string = error?.message;

        switch (true) {
            case error instanceof NotFoundError: {
                throw new NotFoundError(message);
            }

            case error instanceof UnauthorizedError: {
                throw new UnauthorizedError(message);
            }

            case error instanceof ConflictError: {
                throw new ConflictError(message);
            }

            case error instanceof InternalServerError: {
                throw new InternalServerError(message);
            }

            default: {
                throw new InternalServerError('Something went wrong, error: ' + error);
            }
        }
    }
}

export interface ErrorResponse {
    message: string;
}
