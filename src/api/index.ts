import {reduxStorage} from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const API_URL = process.env.REACT_APP_API_URL;
// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${your_token}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    const user = await AsyncStorage.getItem('userInfo');
    const platform = DeviceInfo.getSystemName();

    const language = await reduxStorage.getItem('language');
    if (user) {
      const info = JSON.parse(user);
      config.headers.Authorization = `Bearer ${info.access_token}`;
    }

    config.baseURL = API_URL;
    config.headers['x-custom-lang'] = language;
    config.headers['x-custom-platform'] = platform;

    return config;
  },
  function (error) {
    console.log('error:', error);
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async err => {
    //log url
    console.log('Url when call api is: ', err?.config?.url);
    console.log(
      'Message when call api is: ',
      JSON.stringify(err.response?.data?.message),
    );

    return Promise.reject({
      message: err?.response?.data?.message,
    });
  },
);

export const setToken = (token: string) => {
  const auth = `Bearer ${token}`;
  axios.defaults.headers.Authorization = auth;
};

const API = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default API;
