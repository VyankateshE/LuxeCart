import asyncHandler from '../utils/asyncHandler.js';
import {
  addToCartService,
  checkoutService,
  getCartItemsService,
  removeFromCartService,
  updateCartQuantityService,
} from '../services/cartService.js';

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const item = await addToCartService({
    userId: req.user.id,
    productId,
    quantity,
  });
  res.status(201).json(item);
});

export const getCartItems = asyncHandler(async (req, res) => {
  const items = await getCartItemsService(req.user.id);
  res.json(items);
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const productId = Number(req.params.productId);
  const removed = await removeFromCartService({ userId: req.user.id, productId });
  res.json(removed);
});

export const checkout = asyncHandler(async (req, res) => {
  const data = await checkoutService(req.user.id);
  res.json(data);
});

export const updateCartQuantity = asyncHandler(async (req, res) => {
  const productId = Number(req.params.productId);
  const { quantity } = req.body;
  const data = await updateCartQuantityService({
    userId: req.user.id,
    productId,
    quantity: Number(quantity),
  });
  res.json(data);
});
