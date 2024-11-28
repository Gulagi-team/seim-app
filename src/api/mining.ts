import {Filter} from '@/types/colection';
import api from './index';
export const getMining = () => {
  const data = api.get('/mining/info');
  return data;
};

export const startMining = (data: any) => {
  return api.post('/mining', data);
};

export const claimMining = () => {
  return api.post('/mining/claim');
};

export const getAllMining = (data: Filter) => {
  return api.get('/mining', {params: data});
};
