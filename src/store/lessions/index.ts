import {
  Habit,
  HabitData,
  TaskSelectedItem,
  TaskToUpdate,
} from '@/types/colection';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {union, unionWith} from 'lodash';
import {fetchTopics} from '../topics/action';

export type LessionsState = {
  lessions: Habit[];
  status: string;
  error: any;
  lessionsSelected: Habit[];
  keyLessionSelected: string[];
};

const initialState: LessionsState = {
  lessions: [],
  status: 'idle',
  error: null,
  lessionsSelected: [],
  keyLessionSelected: [],
};

const LessionSlice = createSlice({
  name: 'lession',
  initialState,
  reducers: {
    addKeyLession: (state, action: PayloadAction<string>) => {
      state.keyLessionSelected = union(state.keyLessionSelected, [
        action.payload.toLocaleLowerCase(),
      ]);
    },
    removeKeyLession: (state, action: PayloadAction<string>) => {
      state.keyLessionSelected = state.keyLessionSelected.filter(
        el => el !== action.payload.toLocaleLowerCase(),
      );
    },
    getKeyLession: (state, action: PayloadAction<string[]>) => {
      state.keyLessionSelected = action.payload;
    },
    addLessionSelected: (state, action: PayloadAction<Habit>) => {
      console.log('addLessionSelected', action.payload);
      const index = state.lessionsSelected.findIndex(
        el => el.habit.id === action.payload.habit.id,
      );
      if (index === -1) {
        const arrTeemp: TaskSelectedItem[] = [];
        // action.payload.items.forEach(item => {
        //   arrTemp.push({
        //     item_trans_title: item.item_trans_title,
        //     isDone: false,
        //   });
        // });
        state.lessionsSelected = unionWith(state.lessionsSelected, [
          {
            habit: action.payload.habit,
            startDate: null,
            endDate: null,
          },
        ]);
      } else {
        return;
      }
    },
    updateLessionSelected: state => {
      let temp: Habit[] = [];
      state.keyLessionSelected.map(item => {
        const itemSelected = state.lessionsSelected.filter(
          el => el.habit.id === item,
        );
        temp = unionWith(temp, itemSelected);
      });
      state.lessionsSelected = temp;

      //save to file json local
    },
    getLessionSelected: (state, action: PayloadAction<Habit[]>) => {
      state.lessionsSelected = action.payload;
    },
    updateTaskStatus: (state, action: PayloadAction<TaskToUpdate>) => {
      const index = state.lessionsSelected.findIndex(
        el => el.habit.id === action.payload.habit_id,
      );
      if (index !== -1) {
        if (state.lessionsSelected[index].habit.tasks) {
          state.lessionsSelected[index].habit.tasks[
            action.payload.index
          ].isFinished =
            !state.lessionsSelected[index].habit.tasks[action.payload.index]
              .isFinished;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopics.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const transferData: HabitData[] = [];
        action.payload.forEach((item: any) => {
          transferData.push(...item.habits);
        });

        const final: Habit[] = transferData.map((item: any) => {
          const data = {
            habit: item,
            startDate: null,
            endDate: null,
          };

          return data;
        });

        state.lessions = final;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addKeyLession,
  removeKeyLession,
  getKeyLession,
  addLessionSelected,
  updateLessionSelected,
  getLessionSelected,
  updateTaskStatus,
} = LessionSlice.actions;

export default LessionSlice.reducer;
