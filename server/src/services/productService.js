import { createProduct, getProductById, getProducts } from '../models/productModel.js';

export const addProductService = async (payload) => createProduct(payload);

export const listProductsService = async (filters) => getProducts(filters);

export const getProductDetailsService = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }
  return product;
};
