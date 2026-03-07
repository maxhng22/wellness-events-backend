import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllEventItems, getEventItemById } from '../controllers/event_item.controller';

const router = Router();

// ─── Protected ────
router.get('/', authenticate, getAllEventItems);
router.get('/:id', authenticate, getEventItemById);

export default router;