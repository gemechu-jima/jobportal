import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import * as userService from './user.service';
import { StatusCodes } from 'http-status-codes';

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) throw new Error('Not authenticated');
        const user = await userService.getUserById(req.user.id);
        res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error: any) {
        res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) throw new Error('Not authenticated');
        const user = await userService.updateUser(req.user.id, req.body);
        res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) throw new Error('Not authenticated');
        const result = await userService.deleteUser(req.user.id);
        res.status(StatusCodes.OK).json({ success: true, ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

// Admin Controllers
export const listUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(StatusCodes.OK).json({ success: true, data: users });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};

export const updateRole = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await userService.changeUserRole(Number(id), role);
        res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const filterByRole = async (req: AuthRequest, res: Response) => {
    try {
        const { role } = req.query;
        const users = await userService.getUsersByRole(role as string);
        res.status(StatusCodes.OK).json({ success: true, data: users });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(Number(id), req.body);
        res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const adminDeleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(Number(id));
        res.status(StatusCodes.OK).json({ success: true, ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) throw new Error('Not authenticated');
        const result = await userService.changePassword(req.user.id, req.body);
        res.status(StatusCodes.OK).json({ success: true, ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};
