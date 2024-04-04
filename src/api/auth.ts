import {AxiosResponse} from 'axios';
import api from './index';
import {GetUserProfileResponse} from '@/types/user';
import {stateStore} from '@/store';
import {getUserProfile} from '@/store/userInfo';

// export const login = data => api.post('/auth/login', data);
// export const updateProfile = data => api.put('/users/profile', data);

export const login = async (token: string) => {
  return await api.post('/auth/login', {token});
};

export const getUserProfileMiddleware = async () => {
  await api
    .get('/users/profile')
    .then((res: {data: GetUserProfileResponse}) => {
      console.log('res', res.data);
      stateStore.dispatch(getUserProfile(res.data));
    });
};

export const updateProfile = async (data: any) => {
  return await api.put('/users/profile', data);
};
