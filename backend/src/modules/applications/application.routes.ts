import { Router } from 'express';
import * as applicationController from './application.controller';
import { verifyToken, authorize } from '../../middleware/auth.middleware';
import { applicationValidation, profileValidation, statusUpdateValidation } from './application.validation';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

// Public/Candidate Routes
router.post('/create-profile', verifyToken, profileValidation, validate, applicationController.createProfile);
router.post('/apply', verifyToken, applicationValidation, validate, applicationController.apply);
router.get('/my-applications', verifyToken, applicationController.getByUser);

// Employer/Admin Routes
router.get('/job/:jobId', verifyToken, authorize('employer', 'admin'), applicationController.getByJob);
router.get('/', verifyToken, authorize('admin'), applicationController.listAll);
router.patch('/:id/status', verifyToken, authorize('employer', 'admin'), statusUpdateValidation, validate, applicationController.updateStatus);
router.delete('/:id', verifyToken, authorize('admin'), applicationController.remove);

export default router;
