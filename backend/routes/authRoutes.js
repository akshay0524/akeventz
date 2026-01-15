import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name required').isLength({ min: 2, max: 80 }),
    body('email').trim().normalizeEmail().isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['student', 'admin']).withMessage('Invalid role'),
  ],
  validate,
  register
);

router.post(
  '/login',
  [body('email').trim().normalizeEmail().isEmail(), body('password').notEmpty()],
  validate,
  login
);

export default router;
