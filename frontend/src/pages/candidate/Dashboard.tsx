import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';
import { ProfileSection, SettingsSection } from '../../components/dashboard/ProfileManage';

const CandidateDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'settings'>('overview');

    const mockApplications = [
        { id: 1, company: 'Google', position: 'Frontend Engineer', status: 'pending', date: '2024-03-10' },
        { id: 2, company: 'Meta', position: 'React Developer', status: 'accepted', date: '2024-03-08' },
        { id: 3, company: 'Amazon', position: 'Software Engineer', status: 'rejected', date: '2024-03-05' },
    ];

    const columns = [
        { header: 'Company', accessor: 'company' as const },
        { header: 'Position', accessor: 'position' as const },
        { header: 'Applied Date', accessor: 'date' as const },
        { 
            header: 'Status', 
            accessor: (item: any) => (
                <Badge variant={
                    item.status === 'accepted' ? 'success' : 
                    item.status === 'rejected' ? 'danger' : 'warning'
                }>
                    {item.status.toUpperCase()}
                </Badge>
            )
        },
        {
            header: 'Action',
            accessor: () => (
                <Button variant="ghost" size="sm">View Detail</Button>
            )
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <header className="flex justify-between items-end border-b border-gray-200 dark:border-gray-700 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Welcome, {user?.username}!</h1>
                    <p className="text-text-muted mt-1">Manage your applications and profile settings.</p>
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
                        <Card className="text-center p-6 border-l-4 border-l-warning">
                            <p className="text-text-muted mb-1 text-sm">Applied Jobs</p>
                            <p className="text-3xl font-bold text-primary">3</p>
                        </Card>
                        <Card className="text-center p-6 border-l-4 border-l-success">
                            <p className="text-text-muted mb-1 text-sm">Interviews</p>
                            <p className="text-3xl font-bold text-success">1</p>
                        </Card>
                        <Card className="text-center p-6 border-l-4 border-l-primary">
                            <p className="text-text-muted mb-1 text-sm">Saved Jobs</p>
                            <p className="text-3xl font-bold text-primary">12</p>
                        </Card>
                    </div>

                    <Card title="Recent Applications">
                        <Table data={mockApplications} columns={columns} />
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

export default CandidateDashboard;
