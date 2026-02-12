import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import CandidateLayout from '../layouts/CandidateLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import ProtectedRoute from '../components/ProtectedRoute';

// Dashboard Components
import EmployerDashboard from '../pages/employer/Dashboard';
import CandidateDashboard from '../pages/candidate/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>


            <Route path="/employer" element={<ProtectedRoute />}>
                <Route element={<EmployerLayout />}>
                    <Route path="dashboard" element={<EmployerDashboard />} />
                    {/* Add more employer routes here */}
                    <Route path="jobs" element={<div>My Jobs Page</div>} />
                    <Route path="profile" element={<div>Company Profile Page</div>} />
                    <Route path="applications" element={<div>Applications Page</div>} />
                </Route>
            </Route>

            <Route path="/candidate" element={<ProtectedRoute />}>
                <Route element={<CandidateLayout />}>
                    <Route path="dashboard" element={<CandidateDashboard />} />
                    {/* Add more candidate routes here */}
                    <Route path="jobs" element={<div>Jobs Search Page</div>} />
                    <Route path="applications" element={<div>My Applications Page</div>} />
                    <Route path="saved" element={<div>Saved Jobs Page</div>} />
                    <Route path="profile" element={<div>My Profile Page</div>} />
                </Route>
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<div>User Management Page</div>} />
                    <Route path="jobs" element={<div>Job Moderation Page</div>} />
                    <Route path="reports" element={<div>System Reports Page</div>} />
                    <Route path="settings" element={<div>Admin Settings Page</div>} />
                </Route>
            </Route>

            {/* Generic redirect for legacy dashboard link if needed, 
                or just redirect /dashboard to login if we don't want a dispatcher */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
