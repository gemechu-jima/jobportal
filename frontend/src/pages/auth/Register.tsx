import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Input, Button, Card, Select } from '../../components/common';
import type { RegisterCredentials } from '../../types/auth';

const Register = () => {
    const navigate = useNavigate();
    const { register: registerAuth } = useAuth();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const registerData: RegisterCredentials = {
                username: data.name,
                email: data.email,
                password: data.password,
                role: data.role
            };

            await registerAuth(registerData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card
                className="max-w-md w-full p-2"
                title="Create your account"
                subtitle="Join us to find your dream job or the perfect candidate"
            >
                <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.name?.message as string}
                        {...register('name', { required: 'Name is required' })}
                    />

                    <Input
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message as string}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />

                    <Select
                        label="I am a..."
                        options={[
                            { label: 'Candidate (Looking for a job)', value: 'candidate' },
                            { label: 'Employer (Hiring)', value: 'employer' }
                        ]}
                        error={errors.role?.message as string}
                        {...register('role', { required: 'Role is required' })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        error={errors.password?.message as string}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="********"
                        error={errors.confirmPassword?.message as string}
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (val: string) => {
                                if (watch('password') != val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Register;

