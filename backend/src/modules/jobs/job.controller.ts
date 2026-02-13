import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import * as jobService from './job.service';
import { StatusCodes } from 'http-status-codes';

export const create = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const job = await jobService.createJob({ ...req.body, posted_by: userId });
        res.status(StatusCodes.CREATED).json({ success: true, data: job });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const update = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const job = await jobService.updateJob(Number(id), req.body);
        res.status(StatusCodes.OK).json({ success: true, data: job });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const remove = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const result = await jobService.deleteJob(Number(id));
        res.status(StatusCodes.OK).json({ success: true, ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await jobService.getJobById(Number(id));
        res.status(StatusCodes.OK).json({ success: true, data: job });
    } catch (error: any) {
        res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.status(StatusCodes.OK).json({ success: true, data: jobs });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};

export const getMyJobs = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new Error('Unauthorized');
        const jobs = await jobService.getJobsByEmployer(userId);
        res.status(StatusCodes.OK).json({ success: true, data: jobs });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
};


export const filter = async (req: Request, res: Response) => {
    try {
        const jobs = await jobService.getJobsByFilter(req.query);
        res.status(StatusCodes.OK).json({ success: true, data: jobs });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const close = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const job = await jobService.closeJob(Number(id));
        res.status(StatusCodes.OK).json({ success: true, data: job });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};

export const publish = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const result = await jobService.publishJob(Number(id));
        res.status(StatusCodes.OK).json({ ...result });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
};
