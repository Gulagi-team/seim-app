import api from './index';

export const getLatestVersion = () => api.get('/version/latest');
