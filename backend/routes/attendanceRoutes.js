import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import {
  exportAttendance,
  getAttendanceByEvent,
  getEnrolledStudents,
  markAttendance,
} from '../controllers/attendanceController.js';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [body('userId').notEmpty(), body('eventId').notEmpty(), body('status').isIn(['present', 'absent'])],
  validate,
  markAttendance
);

router.get('/enrolled/:eventId', authenticate, authorize('admin'), getEnrolledStudents);
router.get('/event/:eventId', authenticate, authorize('admin'), getAttendanceByEvent);
router.get('/export/:eventId', authenticate, authorize('admin'), exportAttendance);

export default router;
