import api from './index';

export const getProfile = async () => {
  const data = await api.get('/users/profile');
  return data;
};
