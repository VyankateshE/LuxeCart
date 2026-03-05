import axiosClient from './axiosClient';

export const getMyOrdersApi = async () => {
  const { data } = await axiosClient.get('/orders/my');
  return data;
};
