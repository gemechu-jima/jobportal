import api from './api';
import type { JobApplication, ApplyJobData, ApplicationStatus } from '../types/application';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const applyToJob = async (data: ApplyJobData): Promise<JobApplication> => {
    const response = await api.post<ApiResponse<JobApplication>>('/applications/apply', data);
    return response.data.data;
};

export const getMyApplications = async (userId:number): Promise<JobApplication[]> => {
    const response = await api.get<ApiResponse<JobApplication[]>>(`/applications/user/${userId}`);
    return response.data.data;
};

export const getApplicationsByJob = async (jobId: number | string): Promise<JobApplication[]> => {
    const response = await api.get<ApiResponse<JobApplication[]>>(`/applications/job/${jobId}`);
    return response.data.data;
};

export const updateApplicationStatus = async (id: number | string, status: ApplicationStatus): Promise<JobApplication> => {
    const response = await api.patch<ApiResponse<JobApplication>>(`/applications/${id}/status`, { status });
    return response.data.data;
};

export const deleteApplication = async (id: number | string): Promise<{ message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(`/applications/${id}`);
    return response.data;
};
export const getAllApplicationByEmployerId= async (id:number): Promise<JobApplication[]> => {
    const response = await api.get<ApiResponse<JobApplication[]>>(`/applications/employer/${id}`);
    return response.data.data;
};