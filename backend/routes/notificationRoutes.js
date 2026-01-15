import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createNotification, getMyNotifications, markAsRead } from '../controllers/notificationController.js';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [body('userId').notEmpty(), body('title').notEmpty(), body('message').notEmpty(), body('type').notEmpty()],
  validate,
  createNotification
);

router.get('/me', authenticate, getMyNotifications);
router.patch('/:id/read', authenticate, markAsRead);

export default router;
