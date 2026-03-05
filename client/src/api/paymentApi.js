import axiosClient from './axiosClient';

export const createPaymentIntentApi = async () => {
  const { data } = await axiosClient.post('/payments/create-intent');
  return data;
};
