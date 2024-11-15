import api from './index';

export const signUp = data => api.post('/auth/signUp', data);
export const login = data => {
  console.log('data', data);
  return api.post('/auth/login', data);
};
export const updateProfile = data => api.put('/users/profile', data);
