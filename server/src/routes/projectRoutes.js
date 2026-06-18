import { Router } from 'express';
import { body } from 'express-validator';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(listProjects));
router.get('/:id', asyncHandler(getProject));
router.post(
  '/',
  protect,
  [body('title').trim().notEmpty().withMessage('Title is required')],
  validate,
  asyncHandler(createProject)
);
router.put('/:id', protect, asyncHandler(updateProject));
router.delete('/:id', protect, asyncHandler(deleteProject));

export default router;
