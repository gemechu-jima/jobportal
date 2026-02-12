import { useAuth } from '../../context/AuthContext';
import { Card, Button, Table, Badge } from '../../components/common';

const CandidateDashboard = () => {
    const { user, logout } = useAuth();

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
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Candidate Dashboard</h1>
                    <p className="text-text-muted">Welcome back, {user?.username}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary">Search Jobs</Button>
                    <Button variant="danger" onClick={logout}>Logout</Button>
                </div>
            </header>

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
        </div>
    );
};

export default CandidateDashboard;
