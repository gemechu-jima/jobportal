import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Welcome back, <span className="font-semibold text-indigo-600">{user?.username || 'User'}</span>!
                </p>
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">Email: {user?.email}</p>
                    <p className="text-sm text-gray-500">Role: {user?.role}</p>
                </div>
                <button
                    onClick={logout}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
