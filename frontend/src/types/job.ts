export type JobType = 'full-time' | 'part-time' | 'contract' | 'remote';
export type JobStatus = 'active' | 'inactive';

export interface Job {
    id: number;
    title: string;
    description: string;
    company_name: string;
    location: string;
    salary_range: string | null;
    job_type: JobType;
    posted_by: number;
    deadline: string;
    is_active: boolean;
    status: JobStatus;
    created_at: string;
    updated_at: string;
    application_count?: number;
}


export interface CreateJobData {
    title: string;
    description: string;
    company_name: string;
    location: string;
    salary_range?: string;
    job_type: JobType;
    deadline: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
    is_active?: boolean;
    status?: JobStatus;
}
