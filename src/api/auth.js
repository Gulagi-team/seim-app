import api from './index';

export const signUp = data => api.post('/auth/signUp', data);
export const login = data => api.post('/login-with-google', data);
export const updateProfile = data => api.put('/users/profile', data);
