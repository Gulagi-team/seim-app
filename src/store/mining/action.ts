import {claimMining, getAllMining, getMining, startMining} from '@/api/mining';
import {Filter} from '@/types/colection';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAuth} from '../auth';

export const startMine = createAsyncThunk(
  'mining/startMining',
  async (data: any): Promise<any> => {
    return await startMining(data);
  },
);

export const claimMine = createAsyncThunk(
  'mining/claimMining',
  async (_, {rejectWithValue}): Promise<any> => {
    try {
      const response = await claimMining();
      if (response.error) {
        return rejectWithValue(response.error);
      } else {
        return response;
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  },
);

export const getMiningInfo = createAsyncThunk(
  'mining/getMiningInfo',
  async (): Promise<any> => {
    const auth = await getAuth();
    if (auth) {
      const response = await getMining();
      if (response.data) {
        return response.data;
      }
    }
  },
);

export const getAllMine = createAsyncThunk(
  'mining/getAllMining',
  async (data: Filter): Promise<any> => {
    const response = await getAllMining(data);
    if (response.data) {
      return response.data;
    }
  },
);
