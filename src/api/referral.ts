import api from './index';

export const getReferralInfo = () => {
  const data = api.get('/referral');
  return data;
};

export const addReferral = async (referralCode: string) => {
  try {
    const response = await api.post('/referral/add', {referralCode});
    return response;
  } catch (error) {
    return {error: error.message};
  }
};

export const checkReferralExist = async () => {
  try {
    const response = await api.get('/referral/exist');
    return response.data;
  } catch (error) {
    return {error: error.message};
  }
};
