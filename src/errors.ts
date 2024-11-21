// errors.ts
export class NotFoundError extends Error {
    statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends Error {
    statusCode = 400;
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class DatabaseError extends Error {
    statusCode = 500;
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}
