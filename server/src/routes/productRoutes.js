import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../controllers/productController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorizeRoles('super_admin', 'sub_admin'), addProduct);
router.put('/:id', authenticate, authorizeRoles('super_admin', 'sub_admin'), updateProduct);
router.delete('/:id', authenticate, authorizeRoles('super_admin', 'sub_admin'), deleteProduct);

export default router;
