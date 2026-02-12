import { body } from 'express-validator';

/**
 * Job Creation/Update Validation Rules
 */
export const jobValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
    body('company_name')
        .notEmpty()
        .withMessage('Company name is required'),
    body('location')
        .notEmpty()
        .withMessage('Location is required'),
    body('job_type')
        .isIn(['full-time', 'part-time', 'contract', 'remote'])
        .withMessage('Invalid job type'),
    body('deadline')
        .isISO8601()
        .withMessage('Deadline must be a valid date (ISO8601)')
];
