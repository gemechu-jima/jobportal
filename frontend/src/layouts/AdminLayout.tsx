import { useState } from 'react'; // Added useState
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar } from '../components/common';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    // 1. State to track if sidebar is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { label: 'Overview', path: '/admin/dashboard', icon: '🛡️' },
        { label: 'User Management', path: '/admin/users', icon: '👥' },
        { label: 'Job Moderation', path: '/admin/jobs', icon: '⚖️' },
        { label: 'System Reports', path: '/admin/reports', icon: '📈' },
        { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            {/* 2. Dynamic Sidebar Width & Transition */}
            <aside 
                className={`${
                    isCollapsed ? 'w-20' : 'w-64'
                } bg-slate-900 border-r border-slate-800 flex flex-col text-white transition-all duration-300 ease-in-out`}
            >
                <div className={`p-6 border-b border-slate-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <div>
                            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-2xl">🔒</span> Admin
                            </Link>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Root</p>
                        </div>
                    )}
                    {/* 3. Toggle Button */}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 hover:bg-white/10 rounded-md text-slate-400 transition-colors"
                    >
                        {isCollapsed ? '➡️' : '⬅️'}
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={isCollapsed ? item.label : ''} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {/* 4. Hide label when collapsed */}
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Button 
                        variant="ghost" 
                        fullWidth 
                        className={`text-slate-400 hover:text-white transition-all ${isCollapsed ? 'justify-center p-0' : 'justify-start gap-3'}`} 
                        onClick={logout}
                    >
                        <span>🚪</span> 
                        {!isCollapsed && "Logout"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-text-main">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Control'}
                        </h2>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-600 font-bold uppercase ring-1 ring-red-200">Production</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-text-main">{user?.username}</p>
                            <p className="text-xs text-text-muted capitalize">Security {user?.role}</p>
                        </div>
                        <Avatar name={user?.username} size="md" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-bg-main p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;