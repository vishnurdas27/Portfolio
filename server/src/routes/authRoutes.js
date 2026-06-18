import { Router } from 'express';
import { body } from 'express-validator';
import { login, me } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post(
  '/login',
  [body('email').isEmail().withMessage('Valid email required'), body('password').notEmpty()],
  validate,
  asyncHandler(login)
);

router.get('/me', protect, asyncHandler(me));

export default router;
