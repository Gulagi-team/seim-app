import api from './index';

export const createFeedback = (data: any) => {
  return api.post('/feedback', data);
};
