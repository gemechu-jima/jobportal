import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

  
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
        req.user = decoded;
       // console.log("Decoded user:", decoded); // Debugging line
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Not authorized, token failed' });
    }
};

/**
 * authorize(): Helper to check roles after verifyToken
 */

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "No user authenticated"
      });
    }

    // If admin, allow everything
    if (req.user.role === 'admin') {
      return next();
    }

    // If role is allowed AND user is updating their own account
    if (roles.includes(req.user.role)) {
      if (Number(req.params.id) === req.user.id) {
        return next();
      } else {
        return res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          message: "You can only update your own account"
        });
      }
    }

    // Otherwise reject
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  };
};
