import { Router } from 'express';
import { loginUser ,getUserById,logoutUser} from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// ─── Public ────
router.post('/login', loginUser);  
router.get('/logout', logoutUser);                                     


// ─── Protected────
router.get('/profile', authenticate, getUserById);                          


export default router;
