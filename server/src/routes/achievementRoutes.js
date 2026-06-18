import { Router } from 'express';
import { body } from 'express-validator';
import {
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(listAchievements));
router.post(
  '/',
  protect,
  [body('title').trim().notEmpty().withMessage('Title is required')],
  validate,
  asyncHandler(createAchievement)
);
router.put('/:id', protect, asyncHandler(updateAchievement));
router.delete('/:id', protect, asyncHandler(deleteAchievement));

export default router;
