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
