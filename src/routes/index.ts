import { Router } from 'express';
// import healthRoutes from './health.routes';
import userRoutes from './auth.routes';
import eventItemRoutes from './event_item.route';
import eventRoutes from './event.routes';
import locationRoutes from './location.routes';

const router = Router();

// router.use('/health', healthRoutes);
router.use('/auth', userRoutes);
router.use('/events', eventRoutes);
router.use('/event-items', eventItemRoutes);
router.use('/locations', locationRoutes); // Import location routes

export default router;
