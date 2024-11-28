import {claimMining, getAllMining, getMining, startMining} from '@/api/mining';
import {Filter} from '@/types/colection';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const startMine = createAsyncThunk(
  'mining/startMining',
  async (data: any): Promise<any> => {
    return await startMining(data);
  },
);

export const claimMine = createAsyncThunk(
  'mining/claimMining',
  async (): Promise<any> => {
    return await claimMining();
  },
);

export const getMiningInfo = createAsyncThunk(
  'mining/getMiningInfo',
  async (): Promise<any> => {
    const response = await getMining();
    if (response.data) {
      return response.data;
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
