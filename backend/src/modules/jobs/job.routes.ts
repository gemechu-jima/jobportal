import { Router } from 'express';
import * as jobController from './job.controller';
import { verifyToken, authorize } from '../../middleware/auth.middleware';
import { jobValidation } from './job.validation';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

// Public Routes
router.get('/', jobController.getAll);
router.get('/filter', jobController.filter);
router.get('/:id', jobController.getOne);

// Employer/Admin Routes
router.post('/', verifyToken, authorize('employer', 'admin'), jobValidation, validate, jobController.create);
router.put('/:id', verifyToken, authorize('employer', 'admin'), jobValidation, validate, jobController.update);
router.delete('/:id', verifyToken, authorize('admin'), jobController.remove);
router.patch('/:id/close', verifyToken, authorize('employer', 'admin'), jobController.close);
router.post('/:id/publish', verifyToken, authorize('employer', 'admin'), jobController.publish);

export default router;
