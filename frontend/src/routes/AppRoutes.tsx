import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import CandidateLayout from '../layouts/CandidateLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import JobListing from '../pages/jobs/JobListing';
import JobDetail from '../pages/jobs/JobDetail';

import ProtectedRoute from '../components/ProtectedRoute';


// Dashboard admin
import AdminDashboard from '../pages/admin/Dashboard';
//employer dashboard
import EmployerDashboard from '../pages/employer/Dashboard';
import MyJobs from '../pages/employer/MyJobs';
import JobApplications from '../pages/employer/JobApplications';
import CreateJob from '../pages/employer/CreateJob';
import Applications from '../pages/employer/Application';
import CompanyProfile from '../pages/employer/CompanyProfile';
// candidate dashboard
import CandidateDashboard from '../pages/candidate/Dashboard';
import MyApplications from '../pages/candidate/MyApplications';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="jobs" element={<JobListing />} />
                <Route path="jobs/:id" element={<JobDetail />} />
            </Route>



            <Route path="/employer" element={<ProtectedRoute allowedRoles={['employer']} />}>
                <Route element={<EmployerLayout />}>
                    <Route path="dashboard" element={<EmployerDashboard />} />
                    <Route path="jobs/create" element={<CreateJob />} />
                    <Route path="jobs/:id/applications" element={<JobApplications />} />
                    <Route path="jobs/:id" element={<JobDetail />} />
                    <Route path="jobs" element={<MyJobs />} />
                    <Route path="profile" element={<CompanyProfile/>} />
                    <Route path="applications" element={<Applications />}  />
                </Route>-
            </Route>



            <Route path="/candidate" element={<ProtectedRoute allowedRoles={['candidate']} />}>
                <Route element={<CandidateLayout />}>
                    <Route path="dashboard" element={<CandidateDashboard />} />
                    <Route path="jobs" element={<JobListing />} />
                    <Route path="jobs/:id" element={<JobDetail />} />
                    <Route path="applications" element={<MyApplications/>} />
                    <Route path="saved" element={<div>Saved Jobs Page</div>} />
                    <Route path="profile" element={<div>My Profile Page</div>} />
                </Route>
            </Route>


            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
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
