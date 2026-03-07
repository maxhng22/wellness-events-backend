import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createNewEvent, updateEventById,getAllEvent } from '../controllers/event.controller';

const router = Router();

// ─── Protected ────
router.get('/', authenticate, getAllEvent);
router.post('/', authenticate, createNewEvent);
router.patch('/:id', authenticate, updateEventById);

export default router;