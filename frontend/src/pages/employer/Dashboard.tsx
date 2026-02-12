import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';
import { ProfileSection, SettingsSection } from '../../components/dashboard/ProfileManage';

const EmployerDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'settings'>('overview');

    const mockJobs = [
        { id: 1, title: 'Senior Frontend Developer', status: 'active', applications: 12 },
        { id: 2, title: 'Node.js Backend Engineer', status: 'active', applications: 8 },
        { id: 3, title: 'UI/UX Designer', status: 'closed', applications: 25 },
    ];

    const columns = [
        { header: 'Job Title', accessor: 'title' as const },
        { 
            header: 'Status', 
            accessor: (item: any) => (
                <Badge variant={item.status === 'active' ? 'success' : 'gray'}>
                    {item.status.toUpperCase()}
                </Badge>
            )
        },
        { header: 'Applications', accessor: 'applications' as const },
        {
            header: 'Action',
            accessor: () => (
                <Button variant="outline" size="sm">Manage</Button>
            )
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <header className="flex justify-between items-end border-b border-gray-200 dark:border-gray-700 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Welcome, {user?.username}!</h1>
                    <p className="text-text-muted mt-1">Manage your job postings and company profile.</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'}`}
                    >
                        Overview
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="text-center p-6">
                            <p className="text-text-muted mb-1 text-sm">Active Jobs</p>
                            <p className="text-3xl font-bold text-primary">2</p>
                        </Card>
                        <Card className="text-center p-6">
                            <p className="text-text-muted mb-1 text-sm">Total Applications</p>
                            <p className="text-3xl font-bold text-success">45</p>
                        </Card>
                        <Card className="text-center p-6">
                            <p className="text-text-muted mb-1 text-sm">Drafts</p>
                            <p className="text-3xl font-bold text-warning">1</p>
                        </Card>
                    </div>

                    <Card title="Your Job Postings">
                        <Table data={mockJobs} columns={columns} />
                    </Card>
                </>
            )}

            {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto">
                    <ProfileSection />
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto">
                    <SettingsSection />
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
