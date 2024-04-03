import api from './index';
import topics from '@/assets/json/topics.json';

export const getListTopic = () => {
  if (process.env.DEBUG) {
    return topics;
  }
  return api.get('/topics');
};
