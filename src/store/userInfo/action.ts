import {getProfile} from '@/api/user';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getInfoUser = createAsyncThunk(
  'userInfo/getInfoUser',
  async () => {
    const response = await getProfile();
    return response.data;
  },
);
