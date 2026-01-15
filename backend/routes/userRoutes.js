import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { getUserById, getUsers, updateUserStatus } from '../controllers/userController.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/:id/status', [body('status').isIn(['active', 'suspended'])], validate, updateUserStatus);

export default router;
