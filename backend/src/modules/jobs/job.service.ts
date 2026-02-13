import { Op } from 'sequelize';
import { Job } from './job.model';
import { User } from '../users/user.model';
import { sendJobPostedNotification } from '../notifications/notification.service';



export const createJob = async (jobData: any) => {
    return await Job.create(jobData);
};


export const updateJob = async (jobId: number, data: any) => {
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error('Job not found');
    await job.update(data);
    return job;
};


export const deleteJob = async (jobId: number) => {
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error('Job not found');
    await job.destroy();
    return { message: 'Job deleted successfully' };
};


export const getJobById = async (jobId: number) => {
    const job = await Job.findByPk(jobId, {
        include: [{ model: User, attributes: ['username', 'email'] }]
    });
    if (!job) throw new Error('Job not found');
    return job;
};


export const getAllJobs = async () => {
    return await Job.findAll({
        where: { is_active: true },
        include: [{ model: User, attributes: ['username', 'email'] }],
        order: [['created_at', 'DESC']]
    });
};

export const getJobsByEmployer = async (employerId: number) => {
    const { JobApplication } = require('../applications/job-application.model');
    
    return await Job.findAll({
        where: { posted_by: employerId },
        include: [
            {
                model: JobApplication,
                attributes: [],
                required: false
            }
        ],
        attributes: {
            include: [
                [
                    require('sequelize').fn('COUNT', require('sequelize').col('JobApplications.id')),
                    'application_count'
                ]
            ]
        },
        group: ['Job.id'],
        order: [['created_at', 'DESC']],
        subQuery: false
    });
};



/**
 * getJobsByFilter(): Filter jobs by location, type, keyword
 */
export const getJobsByFilter = async (filters: any) => {
    const { location, type, keyword } = filters;
    const where: any = { is_active: true };

    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (type) where.job_type = type;
    if (keyword) {
        where[Op.or] = [
            { title: { [Op.iLike]: `%${keyword}%` } },
            { company_name: { [Op.iLike]: `%${keyword}%` } },
            { description: { [Op.iLike]: `%${keyword}%` } }
        ];
    }

    return await Job.findAll({
        where,
        include: [{ model: User, attributes: ['username', 'email'] }],
        order: [['created_at', 'DESC']]
    });
};

/**
 * closeJob(): Set is_active to false
 */
export const closeJob = async (jobId: number) => {
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error('Job not found');
    await job.update({ is_active: false });
    return job;
};

/**
 * publishJob(): Mock trigger for Telegram/Facebook
 */
export const publishJob = async (jobId: number) => {
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error('Job not found');

    // Trigger Notifications
    await sendJobPostedNotification({
        jobTitle: job.title,
        company: job.company_name,
        location: job.location
    });

    return { success: true, message: 'Job published to external platforms' };
};
