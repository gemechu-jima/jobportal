import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom Error Class for API Errors
 */
export class ApiError extends Error {
    public statusCode: number;
    public success: boolean;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

/**
 * Global Error Handling Middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Internal Server Error';

    // Handle Sequelize Unique Constraint Errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = StatusCodes.CONFLICT;
        message = err.errors.map((e: any) => e.message).join(', ');
    }

    // Handle Sequelize Validation Errors
    if (err.name === 'SequelizeValidationError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = err.errors.map((e: any) => e.message).join(', ');
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
