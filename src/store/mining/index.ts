import {MiningData} from '@/types/colection';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {claimMine, getAllMine, getMiningInfo, startMine} from './action';

export type MiningState = {
  miningData: MiningData;
  histories: MiningData[];
  status: string;
  error: any;
};

const initialState: MiningState = {
  miningData: {
    startDate: 0,
    endDate: 0,
    point: 0,
    level: 1,
    miningRate: '',
    boost: 0,
    totalInvite: 0,
    totalPoolMined: 0,
  },
  histories: [],
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
      .addCase(startMine.pending, state => {
        state.status = 'loading';
      })
      .addCase(startMine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(startMine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(claimMine.pending, state => {
        state.status = 'loading';
      })
      .addCase(claimMine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(claimMine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getMiningInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getMiningInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.miningData = action.payload ?? {};
      })
      .addCase(getMiningInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllMine.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllMine.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.histories = action.payload.data ?? [];
      })
      .addCase(getAllMine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {updateMiningState} = Miningslice.actions;

export default Miningslice.reducer;
