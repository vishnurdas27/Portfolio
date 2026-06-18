import { Router } from 'express';
import {
  listMessages,
  markRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Admin-only inbox management.
router.get('/', protect, asyncHandler(listMessages));
router.patch('/:id/read', protect, asyncHandler(markRead));
router.delete('/:id', protect, asyncHandler(deleteMessage));

export default router;
