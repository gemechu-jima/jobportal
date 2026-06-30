import { Request, Response } from 'express';
import * as authService from './auth.service';
import { StatusCodes } from 'http-status-codes';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
};
export const registerWithTelegram=async(req:Request,res:Response)=>{
    try {
        const user=await authService.registerWithTelegramData(req.body)
        res.status(StatusCodes.CREATED).json({
            success:true,
            data:user
        })
    } catch (error:any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:error.message
        })
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            ...result
        });
    } catch (error: any) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: error.message
        });
    }
};
export const loginWithTelegram=async(req:Request,res:Response)=>{
    try {
       const result=await authService.loginWithTelegramId(req.body.telegram_id) 
       res.status(StatusCodes.OK).json({
           success:true,
           ...result
       })
    } catch (error:any) {

        res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            message:error.message
        })
        
    }
}
export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new Error('Refresh token required');
        await authService.logout(refreshToken);
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: error.message
        });
    }
};
