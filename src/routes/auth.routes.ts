import { Router } from 'express';
import { loginUser ,getUserById} from '../controllers/auth.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// ─── Public ────
router.post('/login', loginUser);                                        


// ─── Protected────
router.get('/profile', authenticate, getUserById);                          


export default router;
