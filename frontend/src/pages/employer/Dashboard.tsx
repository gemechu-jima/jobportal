import React from 'react';

const EmployerDashboard: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">My Jobs</h2>
                    <p className="text-gray-600 dark:text-gray-400">View and manage your active job postings.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Post a New Job</h2>
                    <p className="text-gray-600 dark:text-gray-400">Create a new job listing to find candidates.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Applications</h2>
                    <p className="text-gray-600 dark:text-gray-400">Review applications from candidates.</p>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
