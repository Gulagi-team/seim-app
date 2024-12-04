import api from './index';

export const getReferralInfo = () => {
  const data = api.get('/referral');
  return data;
};

export const addReferral = (referralCode: string) => {
  return api.post('/referral/add', {referralCode});
};
