import {
  readFromFile,
  updateByIdInFile,
  updateTaskHistory,
} from '@/helpers/file';
import {Habit, Task, TaskToUpdate} from '@/types/colection';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
import {
  completeTask,
  deleteHabit,
  fetchHabits,
  HabitResponse,
  saveHabit,
  startHabit,
} from './action';

export type HabitsState = {
  today: string;
  habits: Habit[];
  taskStack: Task[];
  status: string;
  error: any;
};

const initialState: HabitsState = {
  today: new Date().toISOString(),
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
      const habit = action.payload.habit;
      const taskIndex = habit.tasks?.findIndex(
        el => el.id === action.payload.task_id,
      );

      if (taskIndex !== undefined && taskIndex !== -1 && habit.tasks) {
        const isFinished = action.payload.isFinished;

        const updatedTasks = habit.tasks.map(el =>
          el.id === action.payload.task_id ? {...el, isFinished} : el,
        );
        const updatedHabit = {
          ...habit,
          tasks: updatedTasks,
        };
        //update status of task in state habits
        const habitIndex = state.habits.findIndex(
          el => el.habit.id === updatedHabit.id,
        );
        state.habits[habitIndex].habit = updatedHabit;

        updateByIdInFile('habits.json', habit.id, {habit: updatedHabit});

        //update to file history:createdAt, updatedAt, isFinished, taskId
        const taskHistory = {
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
          isFinished,
          taskId: action.payload.task_id,
        };
        updateTaskHistory(
          'task_histories.json',
          taskHistory.taskId,
          taskHistory,
        );
      }
    },
    updateState: (state, action: PayloadAction<Habit[]>) => {
      return {
        ...state,
        habits: action.payload,
      };
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

        const habitIndex = state.habits.findIndex(
          el => el.habit.id === action.payload,
        );
        state.habits[habitIndex].startDate = moment().toISOString();
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

      .addCase(deleteHabit.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        deleteHabit.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.habits = state.habits.filter(
            el => el.habit.id !== action.payload,
          );
        },
      )
      .addCase(deleteHabit.rejected, (state, action) => {
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

export const {updateTaskStatus, updateState} = HabitSlice.actions;

export default HabitSlice.reducer;
