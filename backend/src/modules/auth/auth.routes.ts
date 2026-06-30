import { Router } from 'express';
import * as authController from './auth.controller';
import { verifyToken } from '../../middleware/auth.middleware';
import { registerValidation, loginValidation } from './auth.validation';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/logout', verifyToken, authController.logout);

// telegram authentication
router.post('/telegram-login', authController.loginWithTelegram);
router.post('/register-with-telegram', authController.registerWithTelegram);
export default router;
