import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';

const EmployerDashboard = () => {
    const { user, logout } = useAuth();

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
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Employer Dashboard</h1>
                    <p className="text-text-muted">Welcome back, {user?.username}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary">Post New Job</Button>
                    <Button variant="danger" onClick={logout}>Logout</Button>
                </div>
            </header>

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
        </div>
    );
};

export default EmployerDashboard;
