import asyncHandler from '../utils/asyncHandler.js';
import {
  addToWishlistService,
  getWishlistItemsService,
  removeFromWishlistService,
} from '../services/wishlistService.js';

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const item = await addToWishlistService({ userId: req.user.id, productId });
  if (!item) {
    return res.status(200).json({ message: 'Item already exists in wishlist.' });
  }
  return res.status(201).json(item);
});

export const getWishlistItems = asyncHandler(async (req, res) => {
  const items = await getWishlistItemsService(req.user.id);
  res.json(items);
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = Number(req.params.productId);
  const item = await removeFromWishlistService({ userId: req.user.id, productId });
  res.json(item);
});
