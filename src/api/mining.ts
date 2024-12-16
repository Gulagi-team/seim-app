import {Filter} from '@/types/colection';
import api from './index';
export const getMining = () => {
  const data = api.get('/mining/info');
  return data;
};

export const startMining = (data: any) => {
  return api.post('/mining', data);
};

export const claimMining = async () => {
  try {
    const response = await api.post('/mining/claim');
    return response;
  } catch (error) {
    return {error: error.message};
  }
};

export const getAllMining = (data: Filter) => {
  return api.get('/mining', {params: data});
};
