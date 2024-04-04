import {stateStore} from '@/store';
import axios, {AxiosError} from 'axios';

const API_URL = process.env.API_URL;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const accessToken = stateStore.getState().userInfo.access_token;
  // Do something before request is sent
  // config.headers.Authorization = `Bearer ${your_token}`;

  config.baseURL = API_URL;
  if (accessToken) {
    console.log('accessToken', accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log('config', config.headers);
  return config;
});

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async (err: AxiosError) => {
    console.log('Api url is:', API_URL);
    console.log('Error when call: ', err);

    return Promise.reject({
      message: err?.message,
    });
  },
);

export const setToken = (token: string) => {
  const auth = `Bearer ${token}`;
  axios.defaults.headers.common['Authorization'] = auth;
};

const API = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default API;
