import {createAsyncThunk} from '@reduxjs/toolkit';
import {getListHabit as getListHabitAPI} from '@/api/habit';
// import {setToken} from '@/api/index';
import {Habit} from '@/types/colection';

export interface HabitResponse {
  today?: string;
  data?: Habit[];
}

export const fetchHabits = createAsyncThunk(
  'habit/fetchHabits',
  async (): Promise<HabitResponse> => {
    // const token = await getData(KEY_AUTHEN);
    // setToken(token);
    return await getListHabitAPI();
  },
);
