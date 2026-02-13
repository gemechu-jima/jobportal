import { Router } from 'express';
import * as applicationController from './application.controller';
import { verifyToken, authorize } from '../../middleware/auth.middleware';
import { applicationValidation, profileValidation, statusUpdateValidation } from './application.validation';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

// Public/Candidate Routes
router.post('/create-profile', verifyToken, profileValidation, validate, applicationController.createProfile);
router.post('/apply', verifyToken, applicationValidation, validate, applicationController.apply);

// Employer/Admin Routes
router.get('/job/:jobId', verifyToken, authorize('employer', 'admin'), applicationController.getByJob);
router.get('/', verifyToken, authorize('admin'), applicationController.listAll);
router.patch('/:id/status', verifyToken, authorize('employer', 'admin'), statusUpdateValidation, validate, applicationController.updateStatus);
router.delete('/:id', verifyToken, authorize('admin'), applicationController.remove);
router.get('/employer/:employerId', verifyToken, authorize('employer', 'admin'), applicationController.getByEmployerId);
// user applications
router.get('/user/:userId', verifyToken, applicationController.getByUser);
export default router;
