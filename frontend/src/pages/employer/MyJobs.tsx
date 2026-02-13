import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Spinner } from '../../components/common';
import { getMyJobs, deleteJob, updateJob } from '../../services/jobService';
import { toast } from 'react-toastify';
import type { Job } from '../../types/job';

const MyJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch jobs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this job posting?')) return;
        
        try {
            await deleteJob(id);
            toast.success('Job deleted successfully');
            fetchJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete job');
        }
    };

    const handleToggleStatus = async (job: Job) => {
        const newStatus = job.status === 'active' ? 'inactive' : 'active';
        try {
            await updateJob(job.id, { status: newStatus });
            toast.success(`Job ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
            fetchJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update job status');
        }
    };

    const filteredJobs = jobs.filter(job => {
        if (filter === 'all') return true;
        return job.status === filter;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">My Job Postings</h1>
                    <p className="text-text-muted mt-1">Manage all your job listings in one place</p>
                </div>
                <Link to="/employer/jobs/create">
                    <Button variant="primary" className="gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Post New Job
                    </Button>
                </Link>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-l-4 border-l-primary">
                    <p className="text-text-muted text-sm mb-1">Total Jobs</p>
                    <p className="text-3xl font-bold text-primary">{jobs.length}</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-success">
                    <p className="text-text-muted text-sm mb-1">Active Jobs</p>
                    <p className="text-3xl font-bold text-success">{jobs.filter(j => j.status === 'active').length}</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-warning">
                    <p className="text-text-muted text-sm mb-1">Inactive Jobs</p>
                    <p className="text-3xl font-bold text-warning">{jobs.filter(j => j.status === 'inactive').length}</p>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        filter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'
                    }`}
                >
                    All ({jobs.length})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        filter === 'active' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'
                    }`}
                >
                    Active ({jobs.filter(j => j.status === 'active').length})
                </button>
                <button
                    onClick={() => setFilter('inactive')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        filter === 'inactive' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-text-muted hover:text-text-main'
                    }`}
                >
                    Inactive ({jobs.filter(j => j.status === 'inactive').length})
                </button>
            </div>

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-text-main mb-2">No jobs found</h3>
                    <p className="text-text-muted mb-6">
                        {filter === 'all' 
                            ? "You haven't posted any jobs yet. Create your first job posting to get started!"
                            : `No ${filter} jobs at the moment.`
                        }
                    </p>
                    {filter === 'all' && (
                        <Link to="/employer/jobs/create">
                            <Button variant="primary">Post Your First Job</Button>
                        </Link>
                    )}
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.map((job) => (
                        <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h2 className="text-xl font-bold text-text-main">{job.title}</h2>
                                        <Badge variant={job.status === 'active' ? 'success' : 'gray'}>
                                            {job.status.toUpperCase()}
                                        </Badge>
                                        <Badge variant={
                                            job.job_type === 'full-time' ? 'primary' :
                                            job.job_type === 'remote' ? 'success' : 'warning'
                                        }>
                                            {job.job_type.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted mb-4">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {job.location}
                                        </div>
                                        {job.salary_range && (
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {job.salary_range}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Posted {new Date(job.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Deadline: {new Date(job.deadline).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-primary">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {job.application_count || 0} {(job.application_count || 0) === 1 ? 'Application' : 'Applications'}
                                        </div>
                                    </div>

                                    <p className="text-text-muted line-clamp-2">{job.description}</p>
                                </div>

                                <div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
                                    {(job.application_count || 0) > 0 && (
                                        <Link to={`/employer/jobs/${job.id}/applications`} className="flex-1 lg:flex-none">
                                            <Button variant="primary" fullWidth size="sm" className="gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Applications ({job.application_count})
                                            </Button>
                                        </Link>
                                    )}
                                    <Link to={`/employer/jobs/${job.id}`} className="flex-1 lg:flex-none">
                                        <Button variant="ghost" fullWidth size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant={job.status === 'active' ? 'warning' : 'success'}
                                        fullWidth 
                                        size="sm"
                                        onClick={() => handleToggleStatus(job)}
                                    >
                                        {job.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        fullWidth 
                                        size="sm"
                                        onClick={() => handleDelete(job.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyJobs;
