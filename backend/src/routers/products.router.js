import express from 'express';
import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('', createProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;
