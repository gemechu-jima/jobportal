
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface ProtectedRouteProps {
    allowedRoles: ("candidate" | "employer" | "admin")[];
}
const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { token, loading , user} = useAuth(); 
   console.log("ProtectedRoute user:", user);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token) {

        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role as any)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
