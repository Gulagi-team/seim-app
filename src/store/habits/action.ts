import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListHabit as getListHabitAPI,
  putStartHabit as putStartHabitAPI,
  postSaveHabit as postSaveHabitAPI,
  deleteHabitById,
} from '@/api/habit';
import {
  postTaskComplete as postTaskCompleteAPI,
  deleteTaskUnComplete as deleteTaskUnCompleteAPI,
} from '@/api/task';
import {setToken} from '@/api/index';
import {getStringLocal} from '@/helpers/localStorage';
import {KEY_AUTHEN} from '@/constants/LocalStoreKey';
import {Habit} from '@/types/colection';
import {getAuth} from '../auth';
import {readFromFile, removeByIdInFile, updateByIdInFile} from '@/helpers/file';
import moment from 'moment';

export interface HabitResponse {
  today?: string;
  data?: Habit[];
}
const FILE_NAME = 'habits.json';
export const fetchHabits = createAsyncThunk(
  'habit/fetchHabits',
  async (): Promise<HabitResponse> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    const response = await getListHabitAPI();

    if (!response.data) {
      const habitsFromFile = await readFromFile('habits.json');
      return {
        data: habitsFromFile,
        today: new Date().toISOString(),
      };
    }
    return response.data;
  },
);

export const startHabit = createAsyncThunk(
  'habit/startHabit',
  async (habitId: string): Promise<any> => {
    const auth = await getAuth();
    if (auth && auth.access_token) {
      await putStartHabitAPI(habitId);
    }
    await updateByIdInFile(FILE_NAME, habitId, {
      startDate: moment().toISOString(),
    });
    return habitId;
  },
);

export const deleteHabit = createAsyncThunk(
  'habit/deleteHabit',
  async (habitId: string): Promise<any> => {
    const auth = await getAuth();
    if (auth && auth.access_token) {
      await deleteHabitById(habitId);
    }

    const result = await removeByIdInFile(FILE_NAME, habitId);

    if (result) {
      return habitId;
    }
  },
);

export const uploadHabit = createAsyncThunk(
  'habit/uploadHabit',
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
  async ({habitId, isStart}: SaveHabitParam): Promise<any> => {
    const auth = await getAuth();
    if (auth && auth.access_token) {
      await postSaveHabitAPI(habitId, isStart);
    }

    //handle in local
    const topics = await readFromFile('topics.json');

    const habitExist = topics.find((item: any) => item.habit.id === habitId);

    const data = {
      ...habitExist,
      startDate: isStart ? moment().toISOString() : null,
    };

    await updateByIdInFile(FILE_NAME, habitId, data);
    const dataLocal = await readFromFile(FILE_NAME);
    const today = new Date().toISOString();
    return {
      data: dataLocal,
      today,
    };
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
