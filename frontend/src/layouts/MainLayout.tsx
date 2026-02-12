import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white dark:bg-gray-800 shadow p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">JobPortal</Link>
                    <nav>
                        <Link to="/login" className="mr-4 hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center mt-auto">
                &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
