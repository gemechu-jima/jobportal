
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { token, loading } = useAuth(); // Using token as primary auth check, could also use isAuthenticated

    if (loading) {
        // You can replace this with a proper loading spinner component
        return <div>Loading...</div>;
    }

    if (!token) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;
