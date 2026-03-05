import { Router } from 'express';
import {
  addToCart,
  checkout,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.get('/', getCartItems);
router.post('/', addToCart);
router.patch('/:productId', updateCartQuantity);
router.delete('/:productId', removeFromCart);
router.post('/checkout', checkout);

export default router;
