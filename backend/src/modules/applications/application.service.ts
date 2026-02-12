import { JobApplication } from './job-application.model';
import { Applicant } from './application.model';
import { Job } from '../jobs/job.model';
import { User } from '../users/user.model';
import { sendApplicationNotification } from '../notifications/notification.service';

/**
 * createApplicantProfile(): Independent work to manage candidate profiles.
 * Automatically extracts official email and name from the User table.
 */
export const createApplicantProfile = async (userData: {
    user_id: number;
    name?: string;
    phone?: string;
    cv_link?: string;
    platform?: string;
}) => {

    const { user_id, name, phone, cv_link, platform } = userData;

    // 1️⃣ Verify User exists (Identity Layer Dependency)
    const existUser = await User.findByPk(user_id);
    if (!existUser) {
        throw new Error('User not found');
    }

    // 2️⃣ Extract official system data
    const profileData = {
        user_id,
        name: name || existUser.username,
        email: existUser.email, // 🔥 Always from system
        phone: phone || null,
        cv_link: cv_link || 'pending',
        platform: platform || 'website'
    };

    // 3️⃣ Upsert logic
    const existingProfile = await Applicant.findOne({ where: { user_id } });

    if (existingProfile) {
        return await existingProfile.update(profileData);
    }

    return await Applicant.create(profileData);
};

/**
 * applyToJob(): Independent work for applications.
 * Supports the profile system by automatically triggering extraction and matching.
 */
export const applyToJob = async (data: {
    job_id: number;
    user_id: number;
    name?: string;
    phone?: string;
    cv_link?: string;
    applied_from: 'website' | 'telegram' | 'facebook';
}) => {

    const { job_id, user_id, applied_from } = data;

    // 1️⃣ Verify Job exists
    const job = await Job.findByPk(job_id, {
        include: [{ model: User, attributes: ['email'] }]
    });

    if (!job) throw new Error('Job not found');

    // 2️⃣ Create or update applicant profile
    const applicant = await createApplicantProfile({
        user_id,
        name: data.name,
        phone: data.phone,
        cv_link: data.cv_link,
        platform: applied_from
    });

    // 3️⃣ Prevent duplicate application
    const existingApplication = await JobApplication.findOne({
        where: {
            job_id,
            applicant_id: applicant.id
        }
    });

    if (existingApplication) {
        throw new Error('You already applied to this job');
    }

    // 4️⃣ Create Job Application
    const application = await JobApplication.create({
        job_id,
        applicant_id: applicant.id,
        applied_from,
        status: 'new'
    });

    // 5️⃣ Notify Employer (Non-blocking optional improvement)
    const employerEmail = (job as any).User?.email;

    if (employerEmail) {
        await sendApplicationNotification({
            employerEmail,
            jobTitle: job.title,
            candidateName: applicant.name
        });
    }

    return application;
};


/**
 * getApplicationsByJob(jobId): Fetch all applications for a specific job
 */
export const getApplicationsByJob = async (jobId: number) => {
    return await JobApplication.findAll({
        where: { job_id: jobId },
        include: [{ model: Applicant }, { model: Job }]
    });
};

/**
 * getApplicationsByUser(userId): Fetch all applications by a specific user
 */
export const getApplicationsByUser = async (userId: number) => {
    return await JobApplication.findAll({
        include: [
            { model: Job },
            {
                model: Applicant,
                where: { user_id: userId }
            }
        ]
    });
};


/**
 * getAllApplications(): Admin function: list all applications
 */
export const getAllApplications = async () => {
    return await JobApplication.findAll({
        include: [{ model: Applicant }, { model: Job }]
    });
};

/**
 * updateApplicationStatus(): Update the status of an application
 */
export const updateApplicationStatus = async (applicationId: number, status: 'new' | 'reviewed' | 'accepted' | 'rejected') => {
    const application = await JobApplication.findByPk(applicationId);
    if (!application) throw new Error('Application not found');
    if (application.status === status) {
        throw new Error('Status already set');
    }
    await application.update({ status });
    return application;
};

/**
 * deleteApplication(): Remove an application
 */
export const deleteApplication = async (applicationId: number) => {
    const application = await JobApplication.findByPk(applicationId);
    if (!application) throw new Error('Application not found');
    await application.destroy();
    return { message: 'Application deleted successfully' };
};
