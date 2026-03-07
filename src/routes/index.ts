import { Router } from 'express';
// import healthRoutes from './health.routes';
import userRoutes from './auth.routes';
import eventItemRoutes from './event_item.route';
import eventRoutes from './event.routes';

const router = Router();

// router.use('/health', healthRoutes);
router.use('/auth', userRoutes);
router.use('/event', eventRoutes);
router.use('/event-items', eventItemRoutes);

export default router;
