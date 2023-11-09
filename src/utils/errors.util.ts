export class UnauthorizedError extends Error {
    constructor(public message: string) {
        super(message);
    }
}
