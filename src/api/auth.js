import api from './index';

export const signUp = data => api.post('/auth/signUp', data);
export const login = data => api.post('/auth/merchant/signIn', data);
