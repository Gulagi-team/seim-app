import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCachedHabits, getCachedTopics, HabitsPayload} from '@/api/catalog';
import {Habit, HabitData} from '@/types/colection';

export interface HabitResponse {
  today?: string;
  data?: Habit[];
}

export type {HabitsPayload};

// The habit catalog is cached at first launch, so this only reads locally.
// Every habit mutation (start / save) is resolved from that same local catalog,
// nothing here talks to the network.
export const fetchHabits = createAsyncThunk(
  'habit/fetchHabits',
  async (): Promise<HabitResponse> => {
    return getCachedHabits();
  },
);

export const startHabit = createAsyncThunk(
  'habit/startHabit',
  async (habitId: string): Promise<string> => {
    return habitId;
  },
);

export interface SaveHabitParam {
  habitId: string;
  isStart: boolean;
  habit?: HabitData;
}

export interface SaveHabitResult {
  habitId: string;
  isStart: boolean;
  habit: HabitData | null;
}

const findHabitInCatalog = (habitId: string): HabitData | null => {
  for (const topic of getCachedTopics()) {
    const hit = topic.habits?.find(item => item.id === habitId);
    if (hit) {
      return hit;
    }
  }
  for (const habit of getCachedHabits().data ?? []) {
    if (habit.habit.id === habitId) {
      return habit.habit;
    }
  }
  return null;
};

export const saveHabit = createAsyncThunk(
  'habit/saveHabit',
  async ({habitId, isStart, habit}: SaveHabitParam): Promise<SaveHabitResult> => {
    return {
      habitId,
      isStart,
      habit: habit ?? findHabitInCatalog(habitId),
    };
  },
);
