import {
  deleteHabitById,
  getListHabit as getListHabitAPI,
  postSaveHabit as postSaveHabitAPI,
  putStartHabit as putStartHabitAPI,
} from '@/api/habit';
import {setToken} from '@/api/index';
import {
  deleteTaskUnComplete as deleteTaskUnCompleteAPI,
  postTaskComplete as postTaskCompleteAPI,
} from '@/api/task';
import {KEY_AUTHEN} from '@/constants/LocalStoreKey';
import {
  readFromFile,
  removeByIdInFile,
  removeFile,
  updateByIdInFile,
  writeToFile,
} from '@/helpers/file';
import {getStringLocal} from '@/helpers/localStorage';
import {Habit, TaskToUpdate} from '@/types/colection';
import {createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import {getAuth} from '../auth';

export interface HabitResponse {
  today?: string;
  data?: Habit[];
}

export interface TaskCompleteParam {
  userHabitId: string;
  taskId: string;
  isFinish: boolean;
}

const FILE_NAME = 'habits.json';
export const fetchHabits = createAsyncThunk(
  'habit/fetchHabits',
  async (): Promise<HabitResponse> => {
    const response = await getListHabitAPI();
    if (!response.data) {
      const habitsFromFile = await readFromFile('habits.json');
      return {
        data: habitsFromFile,
        today: new Date().toISOString(),
      };
    }

    //purpose: update status task when new day
    //delete old data file
    await removeFile(FILE_NAME);
    //update new data file
    await writeToFile(response.data.data, FILE_NAME);

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

export const completeTask = createAsyncThunk(
  'habit/completeTask',
  async ({habit, task_id, isFinished}: TaskToUpdate): Promise<any> => {
    const token = getStringLocal(KEY_AUTHEN) || '';
    setToken(token);
    const auth = await getAuth();
    if (auth && auth.access_token) {
      if (isFinished) {
        await postTaskCompleteAPI(habit.id, task_id);
      } else {
        await deleteTaskUnCompleteAPI(task_id);
      }
    }
    return {
      habit,
      task_id,
      isFinished,
    };
  },
);
