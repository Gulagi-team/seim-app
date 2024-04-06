import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchMining} from './action';
import {MiningData} from '@/types/colection';

export type MiningState = {
  miningData: MiningData;
  status: string;
  error: any;
};

const initialState: MiningState = {
  miningData: {
    startDate: 0,
    endDate: 0,
    point: 0,
    level: 0,
    miningRate: '',
    totalInvite: 0,
    totalPoolMined: 0,
  },
  status: 'idle',
  error: null,
};

const Miningslice = createSlice({
  name: 'mining',
  initialState,
  reducers: {
    updateMiningState: (state, action: PayloadAction<MiningData>) => {
      state.miningData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMining.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchMining.fulfilled,
        (state, action: PayloadAction<MiningData>) => {
          state.status = 'succeeded';
          state.miningData = action.payload;
        },
      )
      .addCase(fetchMining.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {updateMiningState} = Miningslice.actions;

export default Miningslice.reducer;
