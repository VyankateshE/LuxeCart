import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = Router();

router.use(authenticate);
router.post('/create-intent', createPaymentIntent);

export default router;
