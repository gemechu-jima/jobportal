import { body } from 'express-validator';

/**
 * Update Profile Validation Rules
 */
export const updateProfileValidation = [
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email address')
];

/**
 * Change Role Validation Rules
 */
export const roleUpdateValidation = [
    body('role')
        .isIn(['candidate', 'employer', 'admin'])
        .withMessage('Invalid role provided')
];
