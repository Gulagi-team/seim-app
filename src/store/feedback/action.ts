import {createFeedback} from '@/api/feedback';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const addNewFeedback = createAsyncThunk(
  'feedback/create',
  async (data: any): Promise<any> => {
    const response = await createFeedback(data);

    return response.data;
  },
);
