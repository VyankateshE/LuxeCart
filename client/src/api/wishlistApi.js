import axiosClient from './axiosClient';

export const getWishlistApi = async () => {
  const { data } = await axiosClient.get('/wishlist');
  return data;
};

export const addToWishlistApi = async (productId) => {
  const { data } = await axiosClient.post('/wishlist', { productId });
  return data;
};

export const removeFromWishlistApi = async (productId) => {
  const { data } = await axiosClient.delete(`/wishlist/${productId}`);
  return data;
};
