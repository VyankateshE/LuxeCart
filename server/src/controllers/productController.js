import asyncHandler from '../utils/asyncHandler.js';
import {
  addProductService,
  deleteProductService,
  getProductDetailsService,
  listProductsService,
  updateProductService,
} from '../services/productService.js';

export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, imageUrl, stock, rating } = req.body;
  const product = await addProductService({
    name,
    description,
    price,
    category,
    imageUrl,
    stock,
    rating,
  });
  res.status(201).json(product);
});

export const listProducts = asyncHandler(async (req, res) => {
  const filters = {
    search: req.query.search || undefined,
    category: req.query.category || undefined,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    sortBy: req.query.sortBy || undefined,
  };
  const products = await listProductsService(filters);
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await getProductDetailsService(Number(req.params.id));
  res.json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, imageUrl, stock, rating } = req.body;
  const product = await updateProductService({
    id: Number(req.params.id),
    name,
    description,
    price,
    category,
    imageUrl,
    stock,
    rating,
  });
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await deleteProductService(Number(req.params.id));
  res.json(product);
});
