import {addReferral, getReferralInfo} from '@/api/referral';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getReferralInfomation = createAsyncThunk(
  'referral/getReferralInfo',
  async (): Promise<any> => {
    const response = await getReferralInfo();
    return response.data;
  },
);

export const addNewReferral = createAsyncThunk(
  'referral/addReferral',
  async (referralCode: string): Promise<any> => {
    const response = await addReferral(referralCode);
    return response.data;
  },
);
