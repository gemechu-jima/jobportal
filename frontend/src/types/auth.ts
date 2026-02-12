export interface User {
    id: string;
    username: string;
    email: string;
    role: 'candidate' | 'employer' | 'admin';
}

export interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    role: 'candidate' | 'employer';
}

export interface LoginCredentials {
    email: string;
    password: string;
}
