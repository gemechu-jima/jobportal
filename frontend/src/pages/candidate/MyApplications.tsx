import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../../services/applicationService';
import { useAuth } from '../../context/AuthContext';
import { Card, Badge, Spinner, Table, Button } from '../../components/common';
import { toast } from 'react-toastify';
import type { JobApplication } from '../../types/application';

const MyApplications: React.FC = () => {
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const userId = Number(user?.id);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!userId) return;
            try {
                setIsLoading(true);
                const data: JobApplication[] = await getMyApplications(userId);
                
                // Map the real data to match your column accessors (company, position, date)
                const formattedData = data.map(app => ({
                    id: app.id,
                    jobId: app.job_id,
                    company: app.Job?.company_name || 'N/A',
                    position: app.Job?.title || 'Unknown Position',
                    status: app.status,
                    date: new Date(app.created_at).toLocaleDateString()
                }));

                setApplications(formattedData);
            } catch (error: any) {
                toast.error(error.message || "Failed to load applications");
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, [userId]);

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
            accessor: (item: any) => (
                <Link to={`/candidate/jobs/${item.jobId}`}>
                    <Button variant="ghost" size="sm">View Detail</Button>
                </Link>
            )
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-main">My Applications</h1>
                <p className="text-text-muted mt-2">Manage and track your job search progress</p>
            </header>

            {applications.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="text-5xl mb-4">📂</div>
                    <h3 className="text-xl font-semibold text-text-main">No applications found</h3>
                    <p className="text-text-muted mt-2">You haven't applied to any jobs yet.</p>
                    <Link to="/jobs">
                        <Button className="mt-4">Browse Jobs</Button>
                    </Link>
                </Card>
            ) : (
                <Card>
                    <Table data={applications} columns={columns} />
                </Card>
            )}
        </div>
    );
};

export default MyApplications;