import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
                <p className="text-lg">Find your dream job today!</p>
            </div>
        </div>
    );
};

export default Home;
