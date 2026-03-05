import { Router } from 'express';
import { addProduct, getProductById, listProducts } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', addProduct);

export default router;
