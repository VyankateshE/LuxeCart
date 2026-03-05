import axiosClient from './axiosClient';

export const getCartApi = async () => {
  const { data } = await axiosClient.get('/cart');
  return data;
};

export const addToCartApi = async (productId, quantity = 1) => {
  const { data } = await axiosClient.post('/cart', { productId, quantity });
  return data;
};

export const removeFromCartApi = async (productId) => {
  const { data } = await axiosClient.delete(`/cart/${productId}`);
  return data;
};

export const updateCartQuantityApi = async (productId, quantity) => {
  const { data } = await axiosClient.patch(`/cart/${productId}`, { quantity });
  return data;
};

export const checkoutApi = async () => {
  const { data } = await axiosClient.post('/cart/checkout');
  return data;
};
