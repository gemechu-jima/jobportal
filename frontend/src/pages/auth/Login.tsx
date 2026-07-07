import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Input, Button, Card } from '../../components/common';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data: any) => {
        try {
            const response = await login({
                email: data.email,
                password: data.password
            });
            toast.success('Login successful!');

            const role = response.user.role;
            if (role === 'employer') navigate('/employer/dashboard');
            else if (role === 'admin') navigate('/admin/dashboard');
            else navigate('/candidate/dashboard');

        } catch (error: any) {
            console.error('Login failed:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Login failed';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md p-2" title="Sign in to your account">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message as string}
                        {...register('email', { required: 'Email is required' })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        error={errors.password?.message as string}
                        {...register('password', { required: 'Password is required' })}
                    />

                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-main dark:text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="#" className="font-medium text-primary hover:text-primary-hover dark:text-indigo-400">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                        Sign in
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-text-muted dark:text-gray-400">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:text-primary-hover dark:text-indigo-400">
                            Sign up
                        </Link>

                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
