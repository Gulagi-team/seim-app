import {createSlice} from '@reduxjs/toolkit';
import {addNewReferral, getReferralInfomation} from './action';

// {
//   "totalInvited": 1,
//   "totalValid": 0,
//   "totalEarned": 1
// }
export type ReferralState = {
  referralData: {
    totalInvited: number;
    totalValid: number;
    totalEarned: string;
  };
  status: string;
  error: any;
};

const initialState: ReferralState = {
  referralData: {
    totalInvited: 0,
    totalValid: 0,
    totalEarned: '0',
  },
  status: 'idle',
  error: null,
};

const ReferralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getReferralInfomation.pending, state => {
        state.status = 'loading';
      })
      .addCase(getReferralInfomation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.referralData = action.payload;
      })
      .addCase(getReferralInfomation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewReferral.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewReferral.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(addNewReferral.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = ReferralSlice.actions;

export default ReferralSlice.reducer;
