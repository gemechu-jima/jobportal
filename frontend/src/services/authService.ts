import api from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

export const registerUser = async (data: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
};

export const loginUser = async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};
