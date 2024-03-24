import axios from 'axios';

const API_URL = process.env.API_URL;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${your_token}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = API_URL;

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
    console.log('Api url is:', API_URL);
    console.log('Error when call: ', err.response);
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
