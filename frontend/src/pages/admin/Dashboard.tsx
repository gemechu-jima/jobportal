import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';

const AdminDashboard = () => {
    const { user, logout } = useAuth();

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
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">System Admin Control</h1>
                    <p className="text-text-muted">Administrator: {user?.username}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">System Settings</Button>
                    <Button variant="danger" onClick={logout}>Logout Control</Button>
                </div>
            </header>

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
                        <Button variant="outline" fullWidth>Manage Users</Button>
                        <Button variant="outline" fullWidth>Job Moderation</Button>
                        <Button variant="outline" fullWidth>View Reports</Button>
                        <Button variant="outline" fullWidth>Email Service</Button>
                        <Button variant="primary" fullWidth className="col-span-2">Generate Platform Report</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
