import { Router } from 'express';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.get('/', getWishlistItems);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);

export default router;
