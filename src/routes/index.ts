import { Router } from 'express';
// import healthRoutes from './health.routes';
import userRoutes from './auth.routes';

const router = Router();

// router.use('/health', healthRoutes);
router.use('/auth', userRoutes);

export default router;
