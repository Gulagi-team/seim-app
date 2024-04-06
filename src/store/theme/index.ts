import {COLORS} from '@/theme';
import {ThemeType} from '@/types/Appearance';
import {LanguageType, UserProfileType} from '@/types/colection';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type ThemeState = {
  isDarkMode: boolean;
  backgroundColor: string;
  containerColor: string;
  textColor: string;
  textOutstandingColor: string;
  borderColor: string;
  borderSelectedColor: string;
  cardWalletBackgroundColor: string;
  cardWalletBorderColor: string;
  cardWalletTitleColor: string;
  textContainerColor: string;
  textBorderColor: string;
};

const initialState: ThemeState = {
  isDarkMode: false,
  backgroundColor: COLORS.white,
  containerColor: COLORS.white,
  textColor: COLORS.black,
  textOutstandingColor: COLORS.black,
  borderColor: COLORS.text_A200,
  borderSelectedColor: COLORS.black,
  cardWalletBackgroundColor: COLORS.primary_A50,
  cardWalletBorderColor: COLORS.primary_A100,
  cardWalletTitleColor: COLORS.primary_A500,
  textContainerColor: COLORS.text_A50,
  textBorderColor: COLORS.text_A100,
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<ThemeType>) => {
      if (action.payload === 'dark') {
        state.isDarkMode = true;
        state.backgroundColor = COLORS.darkmode_1;
        state.containerColor = COLORS.darkmode_2;
        state.textColor = COLORS.text_A200;
        state.textOutstandingColor = COLORS.white;
        state.borderColor = COLORS.darkmode_3;
        state.borderSelectedColor = COLORS.white;
        state.cardWalletBackgroundColor = 'rgba(27, 156, 252, 0.45)';
        state.cardWalletBorderColor = COLORS.primary_A400;
        state.cardWalletTitleColor = COLORS.primary_A300;
        state.textContainerColor = COLORS.darkmode_3;
        state.textBorderColor = 'rgba(107, 114, 128, 0.45)';
      } else {
        state.isDarkMode = false;
        state.backgroundColor = COLORS.white;
        state.containerColor = COLORS.white;
        state.textColor = COLORS.text_A800;
        state.textOutstandingColor = COLORS.black;
        state.borderColor = COLORS.text_A200;
        state.borderSelectedColor = COLORS.black;
        state.cardWalletBackgroundColor = 'rgba(181, 220, 251, 1)';
        state.cardWalletBorderColor = COLORS.primary_A100;
        state.cardWalletTitleColor = COLORS.primary_A500;
        state.textContainerColor = COLORS.text_A50;
        state.textBorderColor = COLORS.text_A100;
      }
      //   state.email = action.payload.email;
      //   state.name = action.payload.name;
      //   state.avatar = action.payload.avatar;
    },
  },
});

export const {updateTheme} = ThemeSlice.actions;

export default ThemeSlice.reducer;
