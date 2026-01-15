import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../controllers/eventController.js';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('date').isISO8601(),
    body('location').notEmpty(),
    body('availableSeats').isInt({ min: 0 }),
  ],
  validate,
  createEvent
);

router.put('/:id', authenticate, authorize('admin'), updateEvent);
router.delete('/:id', authenticate, authorize('admin'), deleteEvent);

export default router;
