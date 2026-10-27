import moment from 'moment';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  fetchHabits,
  HabitResponse,
  SaveHabitResult,
  startHabit,
  saveHabit,
} from './action';
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

// Every mutation below is local only - the app keeps working with no network.
const HabitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<TaskToUpdate>) => {
      const habitIndex = state.habits.findIndex(
        el => el.habit.id === action.payload.habit_id,
      );
      if (habitIndex === -1) {
        return;
      }
      const tasks = state.habits[habitIndex].habit.tasks;
      const taskIndex = tasks?.findIndex(el => el.id === action.payload.task_id);
      if (tasks && taskIndex !== undefined && taskIndex !== -1) {
        tasks[taskIndex].isFinished = !tasks[taskIndex].isFinished;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHabits.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchHabits.fulfilled,
        (state, action: PayloadAction<HabitResponse>) => {
          state.status = 'succeeded';
          state.today = action.payload.today ?? '';
          // Keep any habit the user already added or started in this install,
          // the catalog only seeds the list.
          const knownIds = state.habits.map(item => item.habit.id);
          const seeded = (action.payload.data ?? []).filter(
            item => !knownIds.includes(item.habit.id),
          );
          state.habits = [...state.habits, ...seeded];
        },
      )
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(startHabit.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        const habitIndex = state.habits.findIndex(
          el => el.habit.id === action.payload,
        );
        if (habitIndex !== -1) {
          state.habits[habitIndex].startDate = moment().toISOString();
        }
      })

      .addCase(
        saveHabit.fulfilled,
        (state, action: PayloadAction<SaveHabitResult>) => {
          state.status = 'succeeded';
          const {habitId, isStart, habit} = action.payload;
          const index = state.habits.findIndex(el => el.habit.id === habitId);
          if (!isStart) {
            if (index !== -1) {
              state.habits.splice(index, 1);
            }
            return;
          }
          if (index === -1 && habit) {
            state.habits.push({
              startDate: moment().toISOString(),
              endDate: null,
              habit,
            });
          }
        },
      );
  },
});

export const {updateTaskStatus} = HabitSlice.actions;

export default HabitSlice.reducer;
