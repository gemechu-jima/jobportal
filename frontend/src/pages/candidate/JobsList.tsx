import React from 'react';

const JobsList: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>
            <div className="flex flex-col space-y-4">
                {/* Search Bar Placeholder */}
                <div className="mb-4">
                    <input type="text" placeholder="Search for jobs..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {/* Job Card Placeholder */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-bold mb-2">Frontend Engineer</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Tech Corp Inc. - Remote</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We are looking for a skilled Frontend Engineer to join our team...
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
                </div>
                {/* More Job Cards... */}
            </div>
        </div>
    );
};

export default JobsList;
