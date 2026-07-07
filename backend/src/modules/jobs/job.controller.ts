import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as jobService from "./job.service";
import { StatusCodes } from "http-status-codes";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const job = await jobService.createJob({ ...req.body, posted_by: userId });
    res.status(StatusCodes.CREATED).json({ success: true, data: job });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobService.updateJob(Number(id), req.body);
    res.status(StatusCodes.OK).json({ success: true, data: job });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await jobService.deleteJob(Number(id));
    res.status(StatusCodes.OK).json({ success: true, ...result });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(Number(id));
    res.status(StatusCodes.OK).json({ success: true, data: job });
  } catch (error: any) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(StatusCodes.OK).json({ success: true, data: jobs });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const getJobsByRole = async (req: AuthRequest, res: Response) => {
  console.log("User in getJobsByRole:", req.user); // Debugging line
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
    }

    const { id, role } = user;

    if (role !== 'admin' && role !== 'employer') {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Access denied'
      });
    }
    const jobs = await jobService.getJobsByUserRole(id, role);

    return res.status(StatusCodes.OK).json({ success: true, data: jobs });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const filter = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getJobsByFilter(req.query);
    res.status(StatusCodes.OK).json({ success: true, data: jobs });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const close = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobService.closeJob(Number(id));
    res.status(StatusCodes.OK).json({ success: true, data: job });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const publish = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await jobService.publishJob(Number(id));
    res.status(StatusCodes.OK).json({ ...result });
  } catch (error: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const getMyJobs = async (req: AuthRequest, res: Response) => {
  console.log("User in getMyJobs:", req.user); // Debugging line
  try {
    const user = req.user;
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      })
    }
    const { id} = user;
    const jobs = await jobService.getMyJobs(id);
    res.status(StatusCodes.OK).json({ success: true, data: jobs });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
}
