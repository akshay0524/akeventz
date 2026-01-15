import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { cancelBooking, createBooking, getAllBookings, getMyBookings } from '../controllers/bookingController.js';

const router = Router();

router.post('/', authenticate, [body('eventId').notEmpty()], validate, createBooking);
router.get('/me', authenticate, getMyBookings);
router.get('/', authenticate, authorize('admin'), getAllBookings);
router.delete('/:id', authenticate, authorize('admin'), cancelBooking);

export default router;
