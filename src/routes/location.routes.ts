import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getLocationsByPostcode } from '../controllers/location.controller';

const router = Router();

// ─── Protected ────
router.get('/:postcode', authenticate, getLocationsByPostcode);


export default router;