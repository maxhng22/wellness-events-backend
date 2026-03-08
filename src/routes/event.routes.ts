import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createNewEvent, cancelEventById,getAllEvent, approveEventById } from '../controllers/event.controller';

const router = Router();

// ─── Protected ────
router.get('/', authenticate, getAllEvent);
router.post('/', authenticate, createNewEvent);
router.patch('/:id/approve', authenticate, approveEventById);
router.patch('/:id/reject', authenticate, cancelEventById);

export default router;