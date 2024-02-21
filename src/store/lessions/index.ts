import firestore from '@react-native-firebase/firestore';
import {
  LessionSelectedType,
  LessionType,
  TaskSelectedItem,
  TaskToUpdate,
} from '@/types/colection';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { union, unionWith } from 'lodash';

export type LessionsState = {
  lessions: LessionSelectedType[];
  status: string,
  error: any,
  lessionsSelected: LessionSelectedType[];
  keyLessionSelected: string[];
};

const initialState: LessionsState = {
  lessions: [],
  status: 'idle',
  error: null,
  lessionsSelected: [],
  keyLessionSelected: [],
};


//  Thunks fetchLessions
export const fetchLessions = createAsyncThunk('lession/fetchLessions', async () => {
  const allLession: any = [];
  const unsubscribe = await firestore()
    .collection('lessions')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(documentSnapshot => {
        allLession.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.data().lession_key,
        });
      });
      console.log('allLession',allLession);
      
      return allLession;
    },
      err => { return JSON.stringify(err) }
    );

  const data = await unsubscribe;
  return data;
})



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
    addLessionSelected: (state, action: PayloadAction<LessionType>) => {
      const index = state.lessionsSelected.findIndex(
        el => el.lession_key === action.payload.lession_key,
      );
      if (index === -1) {
        const arrTemp: TaskSelectedItem[] = [];
        action.payload.items.forEach(item => {
          arrTemp.push({
            item_trans_title: item.item_trans_title,
            isDone: false,
          });
        });
        state.lessionsSelected = unionWith(state.lessionsSelected, [
          {
            items: arrTemp,
            lession_active: action.payload.lession_active,
            lession_color: action.payload.lession_color,
            lession_day_total: action.payload.lession_day_total,
            lession_detail: action.payload.lession_detail,
            lession_detail_sort: action.payload.lession_detail_sort,
            lession_img: action.payload.lession_img,
            lession_key: action.payload.lession_key,
            lession_title: action.payload.lession_title,
            lession_type_key: action.payload.lession_type_key,
            type: action.payload.type,
          },
        ]);
      } else return;
    },
    updateLessionSelected: state => {
      let temp: LessionSelectedType[] = [];
      state.keyLessionSelected.map(item => {
        const itemSelected = state.lessionsSelected.filter(
          el => el.lession_key === item,
        );
        temp = unionWith(temp, itemSelected);
      });
      state.lessionsSelected = temp;
    },
    getLessionSelected: (state, action: PayloadAction<LessionSelectedType[]>,) => {
      state.lessionsSelected = action.payload;
    },
    updateTaskStatus: (state, action: PayloadAction<TaskToUpdate>) => {
      const index = state.lessionsSelected.findIndex(
        el => el.lession_key === action.payload.lession_key,
      );
      if (index !== -1) {
        state.lessionsSelected[index].items[action.payload.index].isDone =
          !state.lessionsSelected[index].items[action.payload.index].isDone;
      }
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchLessions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLessions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.lessions = action.payload;
      })
      .addCase(fetchLessions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
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

