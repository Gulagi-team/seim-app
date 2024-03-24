import moment from 'moment';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {union, unionWith} from 'lodash';
import {fetchHabits, HabitResponse, startHabit} from './action';
import {Habit, TaskToUpdate} from '@/types/colection';

export type HabitsState = {
  today: string;
  habits: Habit[];
  status: string;
  error: any;
};

const initialState: HabitsState = {
  today: '',
  habits: [],
  status: 'idle',
  error: null,
};

const HabitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<TaskToUpdate>) => {
      const habitIndex = state.habits.findIndex(
        el => el.habit.id === action.payload.habit_id,
      );
      if (habitIndex !== -1) {
        const habit = state.habits[habitIndex];
        const taskIndex = habit.habit.tasks.findIndex(
          el => el.id === action.payload.task_id,
        );
        if (taskIndex != -1) {
          state.habits[habitIndex].habit.tasks[taskIndex].isFinished =
            !state.habits[habitIndex].habit.tasks[taskIndex].isFinished;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHabits.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchHabits.fulfilled,
        (state, action: PayloadAction<HabitResponse>) => {
          state.status = 'succeeded';
          state.today = action.payload.today ?? '';
          state.habits = action.payload.data ?? [];
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(startHabit.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(startHabit.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';

        const habitIndex = state.habits.findIndex(
          el => el.habit.id === action.payload,
        );
        state.habits[habitIndex].startDate = moment().toISOString();
      })
      .addCase(startHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {updateTaskStatus} = HabitSlice.actions;

export default HabitSlice.reducer;
