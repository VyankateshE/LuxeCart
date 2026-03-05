import {
  addToWishlistModel,
  getWishlistItemsModel,
  removeFromWishlistModel,
} from '../models/wishlistModel.js';

export const addToWishlistService = async ({ userId, productId }) => {
  const item = await addToWishlistModel({ userId, productId });
  return item;
};

export const getWishlistItemsService = async (userId) => getWishlistItemsModel(userId);

export const removeFromWishlistService = async ({ userId, productId }) => {
  const item = await removeFromWishlistModel({ userId, productId });
  if (!item) {
    const error = new Error('Wishlist item not found.');
    error.statusCode = 404;
    throw error;
  }
  return item;
};
