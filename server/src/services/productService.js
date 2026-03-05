import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../models/productModel.js';

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

export const updateProductService = async ({ id, ...payload }) => {
  const updated = await updateProductById({ id, ...payload });
  if (!updated) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

export const deleteProductService = async (id) => {
  const deleted = await deleteProductById(id);
  if (!deleted) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};
