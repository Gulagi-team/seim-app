import {createAsyncThunk} from '@reduxjs/toolkit';
import {getMining} from '@/api/mining';
import {MiningData} from '@/types/colection';

export const fetchMining = createAsyncThunk(
  'mining/fetchData',
  async (): Promise<MiningData> => {
    return await getMining();
  },
);
