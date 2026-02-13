import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, Table } from '../../components/common';
import { getJobById } from '../../services/jobService';
import { getApplicationsByJob, updateApplicationStatus } from '../../services/applicationService';
import { toast } from 'react-toastify';
import type { Job } from '../../types/job';
import type { JobApplication } from '../../types/application';

const JobApplications = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'accepted' | 'rejected'>('all');

    const fetchData = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const [jobData, applicationsData] = await Promise.all([
                getJobById(id),
                getApplicationsByJob(id)
            ]);
            setJob(jobData);
            setApplications(applicationsData);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch applications');
            navigate('/employer/jobs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleStatusUpdate = async (applicationId: number, status: 'new' | 'reviewed' | 'accepted' | 'rejected') => {
        try {
            await updateApplicationStatus(applicationId, status);
            toast.success(`Application ${status} successfully`);
            fetchData();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update status');
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const columns = [
        {
            header: 'Candidate',
            accessor: (item: JobApplication) => (
                <div>
                    <p className="font-semibold text-text-main">{item.Applicant?.name}</p>
                    <p className="text-sm text-text-muted">{item.Applicant?.email}</p>
                </div>
            )
        },
        {
            header: 'Phone',
            accessor: (item: JobApplication) => item.Applicant?.phone || 'N/A'
        },
        {
            header: 'CV/Resume',
            accessor: (item: JobApplication) => (
                <a 
                    href={item.Applicant?.cv_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View CV
                </a>
            )
        },
        {
            header: 'Applied',
            accessor: (item: JobApplication) => new Date(item.created_at).toLocaleDateString()
        },
        {
            header: 'Status',
            accessor: (item: JobApplication) => (
                <Badge variant={
                    item.status === 'accepted' ? 'success' :
                    item.status === 'rejected' ? 'danger' :
                    item.status === 'reviewed' ? 'warning' : 'gray'
                }>
                    {item.status.toUpperCase()}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessor: (item: JobApplication) => (
                <div className="flex gap-1">
                    {item.status !== 'reviewed' && (
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleStatusUpdate(item.id, 'reviewed')}
                        >
                            Review
                        </Button>
                    )}
                    {item.status !== 'accepted' && (
                        <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleStatusUpdate(item.id, 'accepted')}
                        >
                            Accept
                        </Button>
                    )}
                    {item.status !== 'rejected' && (
                        <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => handleStatusUpdate(item.id, 'rejected')}
                        >
                            Reject
                        </Button>
                    )}
                </div>
            )
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!job) return null;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/employer/jobs">
                    <Button variant="ghost" className="gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Jobs
                    </Button>
                </Link>
            </div>

            <header>
                <h1 className="text-3xl font-bold text-text-main mb-2">{job.title}</h1>
                <p className="text-text-muted">Applications for this position</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="p-4 text-center">
                    <p className="text-text-muted text-xs mb-1">Total</p>
                    <p className="text-2xl font-bold text-primary">{applications.length}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-text-muted text-xs mb-1">New</p>
                    <p className="text-2xl font-bold text-gray-600">{applications.filter(a => a.status === 'new').length}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-text-muted text-xs mb-1">Reviewed</p>
                    <p className="text-2xl font-bold text-warning">{applications.filter(a => a.status === 'reviewed').length}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-text-muted text-xs mb-1">Accepted</p>
                    <p className="text-2xl font-bold text-success">{applications.filter(a => a.status === 'accepted').length}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-text-muted text-xs mb-1">Rejected</p>
                    <p className="text-2xl font-bold text-danger">{applications.filter(a => a.status === 'rejected').length}</p>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
                {(['all', 'new', 'reviewed', 'accepted', 'rejected'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                            filter === status ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'
                        }`}
                    >
                        {status} ({status === 'all' ? applications.length : applications.filter(a => a.status === status).length})
                    </button>
                ))}
            </div>

            {/* Applications Table */}
            {filteredApplications.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-text-main mb-2">No applications found</h3>
                    <p className="text-text-muted">
                        {filter === 'all' 
                            ? 'No candidates have applied to this job yet.'
                            : `No ${filter} applications at the moment.`
                        }
                    </p>
                </Card>
            ) : (
                <Card>
                    <Table data={filteredApplications} columns={columns} />
                </Card>
            )}
        </div>
    );
};

export default JobApplications;
