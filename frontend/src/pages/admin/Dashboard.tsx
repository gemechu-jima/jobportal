import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';
import { ProfileSection, SettingsSection } from '../../components/users/ProfileManage';
import { UserManageTable } from '../../components/users/UserManageTable';
import { JobManagement } from '../../components/jobs/JobManagement';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'profile' | 'settings'>('overview');

    const mockStats = [
        { id: 1, metric: 'Total Users', value: '1,250', trend: '+12%', type: 'primary' },
        { id: 2, metric: 'Active Jobs', value: '340', trend: '+5%', type: 'success' },
        { id: 3, metric: 'Total Applications', value: '5,600', trend: '+18%', type: 'warning' },
        { id: 4, metric: 'Reported Issues', value: '14', trend: '-2%', type: 'danger' },
    ];

    const mockLogs = [
        { id: 1, action: 'User Register', user: 'john_doe', time: '2 mins ago' },
        { id: 2, action: 'Job Posted', user: 'acme_corp', time: '15 mins ago' },
        { id: 3, action: 'System Backup', user: 'system', time: '1 hour ago' },
    ];

    const columns = [
        { header: 'Action', accessor: 'action' as const },
        { header: 'Source', accessor: 'user' as const },
        { header: 'Time', accessor: 'time' as const },
        {
            header: 'Status',
            accessor: () => <Badge variant="success">Completed</Badge>
        }
    ];

    return (
        <div className="p-6 max-w-8xl mx-auto space-y-6">
            <header className="flex justify-between items-end border-b border-gray-200 dark:border-gray-700 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Welcome, Administrator {user?.username}!</h1>
                    <p className="text-text-muted mt-1">Full system overview and user management.</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'users' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Users
                    </button>
                      <button 
                        onClick={() => setActiveTab('jobs')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'jobs' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Jobs
                    </button>
                    <button 
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'profile' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Profile
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'settings' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Settings
                    </button>
                </div>
            </header>

            {activeTab === 'overview' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {mockStats.map((stat) => (
                            <Card key={stat.id} className="p-6">
                                <p className="text-text-muted text-xs uppercase tracking-wider mb-2 font-semibold">{stat.metric}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                                    <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card title="System Activity Logs">
                            <Table data={mockLogs} columns={columns} />
                        </Card>
                        <Card title="Quick Actions">
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" fullWidth onClick={() => setActiveTab('users')}>Manage Users</Button>
                                <Button variant="outline" fullWidth onClick={() => setActiveTab('jobs')}>Job Moderation</Button>
                                <Button variant="outline" fullWidth>View Reports</Button>
                                <Button variant="outline" fullWidth>Email Service</Button>
                                <Button variant="primary" fullWidth className="col-span-2">Generate Platform Report</Button>
                            </div>
                        </Card>
                    </div>
                </>
            )}

            {activeTab === 'users' && (
                <UserManageTable />
            )}

            {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto">
                    <ProfileSection />
                </div>
            )}
           {
            activeTab === 'jobs' && (
                <div className="">
                <JobManagement />
                </div>
            )
           }
            {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto">
                    <SettingsSection />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
