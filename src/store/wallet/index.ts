import {convertDecToHex, formatCurrency} from '@/helpers/conversion';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {union} from 'lodash';
// import themes from '../../theme/themes';

export type WalletState = {
  tokenBalance: string;
  balance: string;
  value: string;
  tokenValue: string;
  linkedWallets: string[];
  password: string;
  currentAccount: string;
  currentNetwork: string;
  currentPrivateKey: string;
};

const initialState: WalletState = {
  balance: '0',
  value: '0',
  tokenValue: '0',
  tokenBalance: '0',
  linkedWallets: [],
  password: '',
  currentAccount: '',
  currentNetwork: '',
  currentPrivateKey: '',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetWalletState: (
      state,
      action: PayloadAction<{
        isResetLinkedWallets: boolean;
      }>,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return {
        ...initialState,
        linkedWallets: action.payload.isResetLinkedWallets
          ? []
          : state.linkedWallets,
      };
    },
    updateWalletBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    updateWalletTokenBalance: (state, action: PayloadAction<string>) => {
      state.tokenBalance = action.payload;
    },
    updatePricing: (state, action: PayloadAction<{binancecoin: number}>) => {
      state.value = formatCurrency(
        action.payload.binancecoin * parseFloat(state.balance),
      );
      // state.tokenValue = formatCurrency(
      //   action.payload.weth * (parseFloat(state.tokenBalance) || 0),
      // );
    },
    updateWalletState: (
      state,
      action: PayloadAction<{
        chainId: number;
        account: string;
      }>,
    ) => {
      state.currentAccount = action.payload.account?.toLowerCase();
      state.currentNetwork = convertDecToHex(action.payload.chainId);
    },
    addLinkedWallet: (state, action: PayloadAction<string>) => {
      state.linkedWallets = union(state.linkedWallets, [
        action.payload.toLocaleLowerCase(),
      ]);
    },
    removeLinkedWallet: (state, action: PayloadAction<string>) => {
      state.linkedWallets = state.linkedWallets.filter(
        el => el !== action.payload.toLocaleLowerCase(),
      );
    },
    updateLinkedWallet: (state, action: PayloadAction<string[]>) => {
      state.linkedWallets = action.payload;
    },
    updateCurrentNetwork: (state, action: PayloadAction<string>) => {
      state.currentNetwork = action.payload;
    },
    addPrivateKey: (state, action: PayloadAction<string>) => {
      state.currentPrivateKey = action.payload;
    },
    addPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const {
  resetWalletState,
  updateWalletBalance,
  updateWalletTokenBalance,
  updatePricing,
  updateWalletState,
  addLinkedWallet,
  removeLinkedWallet,
  updateLinkedWallet,
  updateCurrentNetwork,
  addPrivateKey,
  addPassword,
} = walletSlice.actions;

export default walletSlice.reducer;
