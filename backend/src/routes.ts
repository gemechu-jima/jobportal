import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import applicationRoutes from './modules/applications/application.routes';
import jobRoutes from './modules/jobs/job.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/applications', applicationRoutes);
router.use('/jobs', jobRoutes);

export default router;
