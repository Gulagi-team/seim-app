import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchTopics, TopicResponse} from './action';
import {Topic} from '@/types/colection';

export type TopicsState = {
  topics: Topic[];
  status: string;
  error: any;
};

const initialState: TopicsState = {
  topics: [],
  status: 'idle',
  error: null,
};

const TopicSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    // updateTaskStatus: (state, action: PayloadAction<TaskToUpdate>) => {
    //   const habitIndex = state.habits.findIndex(
    //     el => el.habit.id === action.payload.habit_id,
    //   );
    //   if (habitIndex !== -1) {
    //     const habit = state.habits[habitIndex];
    //     const taskIndex = habit.habit.tasks.findIndex(
    //       el => el.id === action.payload.task_id,
    //     );
    //     if (taskIndex !== -1) {
    //       state.habits[habitIndex].habit.tasks[taskIndex].isFinished =
    //         !state.habits[habitIndex].habit.tasks[taskIndex].isFinished;
    //     }
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopics.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTopics.fulfilled,
        (state, action: PayloadAction<TopicResponse>) => {
          state.status = 'succeeded';
          state.topics = (action.payload as unknown as Topic[]) ?? [];
        },
      )
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const {updateTaskStatus} = TopicSlice.actions;

export default TopicSlice.reducer;
