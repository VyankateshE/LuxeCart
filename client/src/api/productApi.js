import axiosClient from './axiosClient';

export const getProductsApi = async (params = {}) => {
  const { data } = await axiosClient.get('/products', { params });
  return data;
};

export const getProductByIdApi = async (id) => {
  const { data } = await axiosClient.get(`/products/${id}`);
  return data;
};
