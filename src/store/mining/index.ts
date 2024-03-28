import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type MiningState = {
  startDate: number;
  endDate: number;
  point: number;
  level: number;
  miningRate: string;
  totalInvite: number;
  totalPoolMined: number;
};

const initialState: MiningState = {
  startDate: 1711437768425,
  endDate: 1711524168425,
  point: 0,
  level: 0,
  miningRate: '',
  totalInvite: 0,
  totalPoolMined: 0,
};

const Miningslice = createSlice({
  name: 'mining',
  initialState,
  reducers: {
    updateWeight: (state, action: PayloadAction<number>) => {
      state.startDate = action.payload;
    },
  },
});

export const {updateWeight} = Miningslice.actions;

export default Miningslice.reducer;
