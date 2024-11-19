import moment from 'moment';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {union, unionWith} from 'lodash';
import {
  fetchHabits,
  HabitResponse,
  startHabit,
  saveHabit,
  completeTask,
} from './action';
import {Habit, TaskToUpdate, Task} from '@/types/colection';

export type HabitsState = {
  today: string;
  habits: Habit[];
  taskStack: Task[];
  status: string;
  error: any;
};

const initialState: HabitsState = {
  today: '',
  habits: [],
  taskStack: [],
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
        const taskIndex = habit.habit.tasks?.findIndex(
          el => el.id === action.payload.task_id,
        );
        if (taskIndex !== -1) {
          state.taskStack.push(state.habits[habitIndex].habit.tasks[taskIndex]);
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
          console.log('action.payload:', action.payload);
          state.status = 'succeeded';
          state.today = action.payload.today ?? '';
          state.habits = action.payload.data ?? [];
        },
      )
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(startHabit.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(startHabit.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        if (state.habits.length === 0) {
          //call fetchHabits
          fetchHabits();
          console.log('fetchHabits');
        }
        console.log('action.payload:', action.payload);
        console.log('state.habits:', state.habits);
        console.log('state.habits:', state.habits[0].habit.id);

        const habitIndex = state.habits.findIndex(
          el => el.habit.id === action.payload,
        );
        console.log('habitIndex:', habitIndex);
        state.habits[habitIndex].startDate = moment().toISOString();
        console.log('state.habits:after', state.habits);
      })
      .addCase(startHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(saveHabit.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        saveHabit.fulfilled,
        (state, action: PayloadAction<HabitResponse>) => {
          state.status = 'succeeded';
          state.today = action.payload.today ?? '';
          state.habits = action.payload.data ?? [];
        },
      )
      .addCase(saveHabit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(completeTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(completeTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        delete state.taskStack[state.taskStack.length];
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

        // revert status Task
        const oldTask = state.taskStack[state.taskStack.length];
        if (oldTask) {
          const habitIndex: number = state.habits.findIndex(el =>
            el.habit.tasks?.some(et => et.id === oldTask.id),
          );
          if (habitIndex !== -1) {
            const habit = state.habits[habitIndex];
            const taskIndex: number =
              habit.habit.tasks?.findIndex(el => el.id === oldTask.id) || -1;

            if (taskIndex !== -1) {
              state.habits[habitIndex].habit.tasks[taskIndex] = oldTask;
            }
          }

          delete state.taskStack[state.taskStack.length];
        }
      });
  },
});

export const {updateTaskStatus} = HabitSlice.actions;

export default HabitSlice.reducer;
