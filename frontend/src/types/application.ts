export type ApplicationStatus = 'new' | 'reviewed' | 'accepted' | 'rejected';
export type Platform = 'website' | 'telegram' | 'facebook';

export interface Applicant {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string | null;
    cv_link: string;
    platform: Platform;
    applied_at: string;
}

export interface JobApplication {
    id: number;
    job_id: number;
    applicant_id: number;
    status: ApplicationStatus;
    applied_from: Platform;
    created_at: string;
    updated_at: string;
    Job?: {
        id: number;
        title: string;
        company_name: string;
    };
    Applicant?: Applicant;
}

export interface ApplyJobData {
    job_id: number;
    name?: string;
    phone?: string;
    cv_link: string;
    applied_from: Platform;
}
