import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore, Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

import userInfo from './userInfo/index';
import LessionSlice from './lessions/index';
import walletSlice from './wallet/index';
import HabitsSlide from './habits/index';
import TopicSlice from './topics/index';
import MiningSlice from './mining/index';
import ThemeSlice from './theme/index';
import FeedbackSlice from './feedback/index';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
// import theme from './theme';

const reducers = combineReducers({
  // theme,
  // [api.reducerPath]: api.reducer,
  userInfo,
  LessionSlice,
  walletSlice,
  HabitsSlide,
  TopicSlice,
  MiningSlice,
  ThemeSlice,
  FeedbackSlice,
});

export const reducersType = typeof reducers;

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const stateStore = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: getDefaultMiddleware => {
  //   const middlewares = getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(api.middleware);

  //   if (__DEV__ && !process.env.JEST_WORKER_ID) {
  //     const createDebugger = require('redux-flipper').default;
  //     middlewares.push(createDebugger());
  //   }

  //   return middlewares;
  // },
});

const persistor = persistStore(stateStore);

setupListeners(stateStore.dispatch);

export type StoreState = ReturnType<typeof reducers>;

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export {stateStore, persistor};
