import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth'; // Using type-only import
import { loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout } from '../services/authService';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: LoginCredentials) => Promise<AuthResponse>;
    register: (data: RegisterCredentials) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Hydrate user state from localStorage on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await apiLogin(credentials);
            const { accessToken: newToken, user: newUser } = response;

            setToken(newToken);
            setUser(newUser);

            localStorage.setItem('token', newToken); // Redundant if service does it, but safe
            localStorage.setItem('user', JSON.stringify(newUser));

            return response;
        } catch (error) {
            throw error;
        }
    };


    const register = async (credentials: RegisterCredentials) => {
        try {
            await apiRegister(credentials);
            // Usually register doesn't auto-login, but if it does, handle it here.
            // Based on Register.tsx it redirects to login, so no state change needed here.
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        apiLogout(); // Clears token from localStorage
        localStorage.removeItem('user'); // We also clear user
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
