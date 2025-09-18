import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getProfile } from '../controllers/profileController';

const router = Router();

router.get('/', authenticate, getProfile);

export default router;
