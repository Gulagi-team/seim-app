import api from './index';

export const checkAddress = async (address: string) => {
  const data = await api.get(`/web3/check-address/${address}`);
  return data;
};
