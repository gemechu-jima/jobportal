import api from './api';
import type { User, UpdateProfileData, ChangePasswordData } from '../types/auth';

// Backend response wrapper
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const getProfile = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data.data;
};

export const getUserById = async (id: string): Promise<User> => {
    // The backend uses /users/:id or similar for admin. 
    // Currently backend has /users/:id/role but wait, let's check if there is a get by id for admin.
    // userController.listUsers is at GET /users/
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
};

export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/users/profile', data);
    return response.data.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await api.put<{ success: boolean; message: string }>('/users/change-password', data);
    return response.data;
};

export const deleteAccount = async (): Promise<{ message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>('/users/profile');
    return response.data;
};

export const listUsers = async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
};

export const adminUpdateUser = async (id: string, data: UpdateProfileData): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
};

export const adminDeleteUser = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(`/users/${id}`);
    return response.data;
};

