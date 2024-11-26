import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addNewFeedback} from './action';

export type FeedbackState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
};

const initialState: FeedbackState = {
  status: 'idle',
  error: null,
};

const FeedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewFeedback.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        addNewFeedback.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.error = null;
        },
      )
      .addCase(addNewFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = FeedbackSlice.actions;

export default FeedbackSlice.reducer;
