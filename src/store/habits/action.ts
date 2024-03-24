import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListHabit as getListHabitAPI,
  putStartHabit as putStartHabitAPI,
} from '@/api/habit';
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

export const startHabit = createAsyncThunk(
  'habit/startHabit',
  async (habitId: string): Promise<any> => {
    // const token = await getData(KEY_AUTHEN);
    // setToken(token);
    await putStartHabitAPI(habitId);
    return habitId;
  },
);
