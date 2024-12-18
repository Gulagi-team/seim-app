import api from './index';

export const signUp = (data: any) => api.post('/auth/signUp', data);
export const login = (data: any) => {
  return api.post('/auth/login', data);
};
export const updateProfile = (data: any) => api.put('/users/profile', data);
