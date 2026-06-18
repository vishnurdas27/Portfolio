import { Router } from 'express';
import { body } from 'express-validator';
import { createMessage } from '../controllers/messageController.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Public contact form submission.
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  asyncHandler(createMessage)
);

export default router;
