import { body } from 'express-validator';

/**
 * Job Application Validation Rules
 */
export const applicationValidation = [
    body('job_id')
        .isInt()
        .withMessage('Valid Job ID is required'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    // Phone is optional
    // CV Link is optional
    body('applied_from')
        .isIn(['website', 'telegram', 'facebook'])
        .withMessage('Invalid source (applied_from)')
];

/**
 * Profile Creation Validation Rules
 */
export const profileValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    // Phone is optional
    // CV Link is optional
];

/**
 * Application Status Update Validation Rules
 */
export const statusUpdateValidation = [
    body('status')
        .isIn(['new', 'reviewed', 'accepted', 'rejected'])
        .withMessage('Invalid application status')
];
