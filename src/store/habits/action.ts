import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListHabit as getListHabitAPI,
  putStartHabit as putStartHabitAPI,
  postSaveHabit as postSaveHabitAPI,
} from '@/api/habit';
import {
  postTaskComplete as postTaskCompleteAPI,
  deleteTaskUnComplete as deleteTaskUnCompleteAPI,
} from '@/api/task';
import {setToken} from '@/api/index';
import {getStringLocal} from '@/helpers/localStorage';
import {KEY_AUTHEN} from '@/constants/LocalStoreKey';
import {Habit} from '@/types/colection';

export interface HabitResponse {
  today?: string;
  data?: Habit[];
}

export const fetchHabits = createAsyncThunk(
  'habit/fetchHabits',
  async (): Promise<HabitResponse> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    return await getListHabitAPI();
  },
);

export const startHabit = createAsyncThunk(
  'habit/startHabit',
  async (habitId: string): Promise<any> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    await putStartHabitAPI(habitId);
    return habitId;
  },
);

export interface SaveHabitParam {
  habitId: string;
  isStart: boolean;
}
export const saveHabit = createAsyncThunk(
  'habit/saveHabit',
  async ({habitId, isStart}: SaveHabitParam): Promise<HabitResponse> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    await postSaveHabitAPI(habitId, isStart);

    return await getListHabitAPI();
  },
);

export interface TaskCompleteParam {
  userHabitId: string;
  taskId: string;
  isFinish: boolean;
}
export const completeTask = createAsyncThunk(
  'habit/completeTask',
  async ({userHabitId, taskId, isFinish}: TaskCompleteParam): Promise<any> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    if (isFinish) {
      return await postTaskCompleteAPI(userHabitId, taskId);
    } else {
      return await deleteTaskUnCompleteAPI(taskId);
    }
  },
);
