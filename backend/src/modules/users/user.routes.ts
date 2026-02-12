import { Router } from 'express';
import * as userController from './user.controller';
import { verifyToken, authorize } from '../../middleware/auth.middleware';
import { updateProfileValidation, roleUpdateValidation } from './user.validation';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

// User Profile Routes
router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, updateProfileValidation, validate, userController.updateProfile);
router.put('/change-password', verifyToken, userController.changePassword);
router.delete('/profile', verifyToken, userController.deleteAccount);


// Admin Routes
router.get('/', verifyToken, authorize('admin'), userController.listUsers);
router.put('/:id', verifyToken, authorize('admin'), updateProfileValidation, validate, userController.updateUserProfile);
router.delete('/:id', verifyToken, authorize('admin'), userController.adminDeleteUser);
router.patch('/:id/role', verifyToken, authorize('admin'), roleUpdateValidation, validate, userController.updateRole);
router.get('/filter', verifyToken, authorize('admin'), userController.filterByRole);


export default router;
