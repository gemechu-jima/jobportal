import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import * as applicationService from './application.service';
import { StatusCodes } from 'http-status-codes';

export const createProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const profile = await applicationService.createApplicantProfile({
            ...req.body,
            user_id: userId
        });
        res.status(StatusCodes.CREATED).json({ success: true, data: profile });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const apply = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const application = await applicationService.applyToJob({ ...req.body, user_id: userId });
        res.status(StatusCodes.CREATED).json({ success: true, data: application });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const getByJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;
        const applications = await applicationService.getApplicationsByJob(Number(jobId));
        res.status(StatusCodes.OK).json({ success: true, data: applications });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const getByUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new Error('Not authenticated');
        const applications = await applicationService.getApplicationsByUser(Number(userId));
        res.status(StatusCodes.OK).json({ success: true, data: applications });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const listAll = async (req: Request, res: Response) => {
    try {
        const applications = await applicationService.getAllApplications();
        res.status(StatusCodes.OK).json({ success: true, data: applications });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const application = await applicationService.updateApplicationStatus(Number(id), status);
        res.status(StatusCodes.OK).json({ success: true, data: application });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await applicationService.deleteApplication(Number(id));
        res.status(StatusCodes.OK).json({ success: true, ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const getByEmployerId = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id || req.params.employerId;
        console.log(userId);
        if (!userId) throw new Error('Not authenticated');
        const applications = await applicationService.getAllApplicationByEmployerId(Number(userId));
        res.status(StatusCodes.OK).json({ success: true, data: applications });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

