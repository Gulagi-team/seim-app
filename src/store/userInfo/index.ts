import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import themes from '../../theme/themes';

export type InfoState = {
  language: string;
  gender: string;
  old: string;
  height: string;
  weight: string;
};

const initialState: InfoState = {
  language: "",
  gender: "",
  old: "",
  height: "",
  weight: "",
};

const Infoslice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    updateOld: (state, action: PayloadAction<string>) => {
      state.old = action.payload;
    },
    updateHeight: (state, action: PayloadAction<string>) => {
      state.height = action.payload;
    },
    updateWeight: (state, action: PayloadAction<string>) => {
      state.weight = action.payload;
    },
  },
});

export const {
  updateLanguage,
  updateGender,
  updateOld,
  updateHeight,
  updateWeight,
} = Infoslice.actions;

export default Infoslice.reducer;
