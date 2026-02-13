import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, TextArea, Select, Button } from '../../components/common';
import { createJob } from '../../services/jobService';
import type { CreateJobData } from '../../types/job';

const CreateJob = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateJobData>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: CreateJobData) => {
        setIsLoading(true);
        try {
            await createJob(data);
            toast.success('Job posted successfully!');
            navigate('/employer/dashboard');
        } catch (error: any) {
            console.error('Failed to create job:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create job';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <header className="mb-8">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(-1)}
                    className="mb-4"
                >
                    ← Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold text-text-main">Post a New Job</h1>
                <p className="text-text-muted mt-1">Fill in the details below to find your next great hire.</p>
            </header>

            <Card className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Job Title"
                            placeholder="e.g. Senior React Developer"
                            error={errors.title?.message}
                            {...register('title', { 
                                required: 'Title is required',
                                minLength: { value: 5, message: 'Title must be at least 5 characters' }
                            })}
                        />
                        <Input
                            label="Company Name"
                            placeholder="e.g. Acme Corp"
                            error={errors.company_name?.message}
                            {...register('company_name', { required: 'Company name is required' })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Location"
                            placeholder="e.g. New York, NY or Remote"
                            error={errors.location?.message}
                            {...register('location', { required: 'Location is required' })}
                        />
                        <Select
                            label="Job Type"
                            options={[
                                { label: 'Full-time', value: 'full-time' },
                                { label: 'Part-time', value: 'part-time' },
                                { label: 'Contract', value: 'contract' },
                                { label: 'Remote', value: 'remote' }
                            ]}
                            error={errors.job_type?.message}
                            {...register('job_type', { required: 'Job type is required' })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Salary Range (Optional)"
                            placeholder="e.g. $80k - $120k"
                            error={errors.salary_range?.message}
                            {...register('salary_range')}
                        />
                        <Input
                            label="Application Deadline"
                            type="date"
                            error={errors.deadline?.message}
                            {...register('deadline', { required: 'Deadline is required' })}
                        />
                    </div>

                    <TextArea
                        label="Job Description"
                        placeholder="Describe the role, responsibilities, and requirements..."
                        rows={8}
                        error={errors.description?.message}
                        {...register('description', { required: 'Description is required' })}
                    />

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => navigate(-1)}
                            disabled={isSubmitting || isLoading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary" 
                            isLoading={isSubmitting || isLoading}
                            className="px-8"
                        >
                            Post Job
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateJob;
