import axiosClient from './axiosClient';

export const getProductsApi = async (params = {}) => {
  const { data } = await axiosClient.get('/products', { params });
  return data;
};

export const getProductByIdApi = async (id) => {
  const { data } = await axiosClient.get(`/products/${id}`);
  return data;
};

export const createProductApi = async (payload) => {
  const { data } = await axiosClient.post('/products', payload);
  return data;
};

export const updateProductApi = async (id, payload) => {
  const { data } = await axiosClient.put(`/products/${id}`, payload);
  return data;
};

export const deleteProductApi = async (id) => {
  const { data } = await axiosClient.delete(`/products/${id}`);
  return data;
};
