import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getMyOrders } from '../controllers/orderController.js';

const router = Router();

router.use(authenticate);
router.get('/my', getMyOrders);

export default router;
