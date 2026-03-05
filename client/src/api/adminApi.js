import axiosClient from './axiosClient';

export const getAdminOverviewApi = async () => {
  const { data } = await axiosClient.get('/admin/overview');
  return data;
};

export const getAdminUsersApi = async () => {
  const { data } = await axiosClient.get('/admin/users');
  return data;
};

export const createSubAdminApi = async (payload) => {
  const { data } = await axiosClient.post('/admin/sub-admins', payload);
  return data;
};
