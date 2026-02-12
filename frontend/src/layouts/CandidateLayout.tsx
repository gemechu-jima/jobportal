import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar } from '../components/common';

const CandidateLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/candidate/dashboard', icon: '🏠' },
        { label: 'Search Jobs', path: '/candidate/jobs', icon: '🔍' },
        { label: 'My Applications', path: '/candidate/applications', icon: '📄' },
        { label: 'Saved Jobs', path: '/candidate/saved', icon: '⭐' },
        { label: 'My Profile', path: '/candidate/profile', icon: '👤' },
    ];

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
                        <span className="text-2xl">🚀</span> JobPortal
                    </Link>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mt-1 font-bold">Candidate Portal</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost" fullWidth className="justify-start gap-3" onClick={logout}>
                        <span>🚪</span> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-text-main">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Candidate Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-text-main">{user?.username}</p>
                            <p className="text-xs text-text-muted capitalize">{user?.role}</p>
                        </div>
                        <Avatar name={user?.username} size="md" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-bg-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default CandidateLayout;
