import {LanguageType, UserProfileType} from '@/types/colection';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import themes from '../../theme/themes';

export type InfoState = {
  access_token: string;
  email: string;
  name: string;
  avatar: string;
  language: LanguageType;
  gender: string;
  old: number;
  height: number;
  weight: number;
  referralCode: string;
  referralLink: string;
};

const initialState: InfoState = {
  access_token: '',
  email: '',
  name: '',
  avatar: '',
  language: 'en',
  gender: '',
  old: 0,
  height: 0,
  weight: 0,
  referralCode: 'LCY9345MGY',
  referralLink: 'get.seim.io/ref=FDFAA',
};

const Infoslice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<UserProfileType>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    updateInfoUser: (state, action: PayloadAction<InfoState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.language = action.payload.language;
      state.gender = action.payload.gender;
      state.old = action.payload.old;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
    },
    updateLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
    },
    updateGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    updateOld: (state, action: PayloadAction<number>) => {
      state.old = action.payload;
    },
    updateHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    updateWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
  },
});

export const {
  updateUserProfile,
  updateInfoUser,
  updateLanguage,
  updateGender,
  updateOld,
  updateHeight,
  updateWeight,
} = Infoslice.actions;

export default Infoslice.reducer;
