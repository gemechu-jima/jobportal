import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Active Jobs</h2>
                    <p className="text-3xl font-bold text-green-600">567</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Applications</h2>
                    <p className="text-3xl font-bold text-purple-600">8,910</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
                    <p className="text-3xl font-bold text-red-600">12</p>
                </div>
            </div>
            {/* Additional Admin Sections */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                {/* List of recent activities */}
            </div>
        </div>
    );
};

export default AdminDashboard;
