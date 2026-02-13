import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, Table, Badge, Button, Modal, Input, TextArea, Select } from '../common';
import { getMyJobs, deleteJob, updateJob, publishJob, closeJob } from '../../services/jobService';
import type { Job, UpdateJobData } from '../../types/job';

export const JobManagement = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [editData, setEditData] = useState<UpdateJobData>({});

    const fetchMyJobs = async () => {
        setIsLoading(true);
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch (error: any) {
            toast.error('Failed to fetch your jobs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await deleteJob(id);
                toast.success('Job deleted successfully');
                fetchMyJobs();
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete job');
            }
        }
    };

    const handleClose = async (id: number) => {
        try {
            await closeJob(id);
            toast.success('Job closed successfully');
            fetchMyJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to close job');
        }
    };

    const handlePublish = async (id: number) => {
        try {
            await publishJob(id);
            toast.success('Job published successfully');
            fetchMyJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to publish job');
        }
    };

    const openEditModal = (job: Job) => {
        setSelectedJob(job);
        setEditData({
            title: job.title,
            description: job.description,
            company_name: job.company_name,
            location: job.location,
            salary_range: job.salary_range || '',
            job_type: job.job_type,
            deadline: job.deadline.split('T')[0]
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedJob) return;
        try {
            await updateJob(selectedJob.id, editData);
            toast.success('Job updated successfully');
            setIsEditModalOpen(false);
            fetchMyJobs();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update job');
        }
    };

    const columns = [
         {header:"Company", accessor:"company_name" as const},
        { header: 'Title', accessor: 'title' as const },
        { 
            header: 'Status', 
            accessor: (job: Job) => (    
                <Badge variant={job.is_active ? 'success' : 'gray'}>
                    {job.is_active ? 'ACTIVE' : 'CLOSED'}
                </Badge>
            )
        },
        { header: 'Type', accessor: 'job_type' as const },
        { header: 'Posted', accessor: (job: Job) => new Date(job.created_at).toLocaleDateString() },
        {
            header: 'Actions',
            accessor: (job: Job) => (
                <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(job)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handlePublish(job.id)}>Publish</Button>
                    {job.is_active && (
                        <Button variant="warning" size="sm" onClick={() => handleClose(job.id)}>Close</Button>
                    )}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(job.id)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <>
            <Card title="Manage Your Job Postings" subtitle="Edit, close, or delete your posted jobs.">
                <Table data={jobs} columns={columns} isLoading={isLoading} />
            </Card>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Job Posting"
            >
                <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Job Title"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />
                        <Input
                            label="Company Name"
                            value={editData.company_name}
                            onChange={(e) => setEditData({ ...editData, company_name: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Location"
                            value={editData.location}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        />
                        <Select
                            label="Job Type"
                            options={[
                                { label: 'Full-time', value: 'full-time' },
                                { label: 'Part-time', value: 'part-time' },
                                { label: 'Contract', value: 'contract' },
                                { label: 'Remote', value: 'remote' }
                            ]}
                            value={editData.job_type}
                            onChange={(e) => setEditData({ ...editData, job_type: e.target.value as any })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Salary Range"
                            value={editData.salary_range}
                            onChange={(e) => setEditData({ ...editData, salary_range: e.target.value })}
                        />
                        <Input
                            label="Deadline"
                            type="date"
                            value={editData.deadline}
                            onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                        />
                    </div>
                    <TextArea
                        label="Description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={5}
                    />
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
