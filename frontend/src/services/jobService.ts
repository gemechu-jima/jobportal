import api from './api';
import type { Job, CreateJobData, UpdateJobData } from '../types/job';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// Helper to transform backend job data
const transformJob = (job: any): Job => ({
    ...job,
    status: job.is_active ? 'active' : 'inactive'
});

export const getAllJobs = async (): Promise<Job[]> => {
    const response = await api.get<ApiResponse<any[]>>('/jobs');
    return response.data.data.map(transformJob);
};

export const getMyJobs = async (): Promise<Job[]> => {
    const response = await api.get<ApiResponse<any[]>>('/jobs/my-jobs');
    return response.data.data.map(transformJob);
};


export const getJobsByFilter = async (filters: { location?: string; type?: string; keyword?: string }): Promise<Job[]> => {
    const response = await api.get<ApiResponse<any[]>>('/jobs/filter', { params: filters });
    return response.data.data.map(transformJob);
};


export const getJobById = async (id: string | number): Promise<Job> => {
    const response = await api.get<ApiResponse<any>>(`/jobs/${id}`);
    return transformJob(response.data.data);
};

export const createJob = async (data: CreateJobData): Promise<Job> => {
    const response = await api.post<ApiResponse<any>>('/jobs', data);
    return transformJob(response.data.data);
};

export const updateJob = async (id: string | number, data: UpdateJobData): Promise<Job> => {
    // Transform status to is_active for backend
    const backendData = { ...data };
    if (data.status) {
        backendData.is_active = data.status === 'active';
        delete backendData.status;
    }
    const response = await api.put<ApiResponse<any>>(`/jobs/${id}`, backendData);
    return transformJob(response.data.data);
};

export const deleteJob = async (id: string | number): Promise<{ message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(`/jobs/${id}`);
    return response.data;
};

export const publishJob = async (id: string | number): Promise<{ message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>(`/jobs/${id}/publish`);
    return response.data;
};

export const closeJob = async (id: string | number): Promise<{ message: string }> => {
    const response = await api.patch<{ success: boolean; message: string }>(`/jobs/${id}/close`);
    return response.data;
};
