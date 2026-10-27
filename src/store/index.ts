import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  createTransform,
  persistReducer,
  persistStore,
  Storage,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

import userInfo from './userInfo/index';
import LessionSlice from './lessions/index';
import HabitsSlide from './habits/index';
import TopicSlice from './topics/index';
import ThemeSlice from './theme/index';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
// import theme from './theme';

const reducers = combineReducers({
  // theme,
  // [api.reducerPath]: api.reducer,
  userInfo,
  LessionSlice,
  HabitsSlide,
  TopicSlice,
  ThemeSlice,
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

// redux-persist serialises the whole persisted slice after every action, so
// ticking a task used to stringify the pack and topic catalog and write it to
// MMKV synchronously on the JS thread. The catalog is not user data: it is
// cached on its own and read back on every launch, so it is dropped from the
// persisted payload and the write itself is debounced.
const debounceMs = 300;
let persistTimer: ReturnType<typeof setTimeout> | null = null;

export const flushPersistedState = () => {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  persistor.flush();
};

const persistStorage: Storage = {
  setItem: (key, value) => {
    if (persistTimer) {
      clearTimeout(persistTimer);
    }
    persistTimer = setTimeout(() => {
      persistTimer = null;
      storage.set(key, value);
    }, debounceMs);
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

const dropLessionCatalog = createTransform<any, any>(
  (inboundState: any) => {
    if (!inboundState) {
      return inboundState;
    }
    const {lessions, ...userState} = inboundState;
    return userState;
  },
  outboundState => outboundState,
  {whitelist: ['LessionSlice']},
);

const dropTopicCatalog = createTransform<any, any>(
  (inboundState: any) => {
    if (!inboundState) {
      return inboundState;
    }
    const {topics, ...userState} = inboundState;
    return userState;
  },
  outboundState => outboundState,
  {whitelist: ['TopicSlice']},
);

const persistConfig = {
  key: 'root',
  storage: persistStorage,
  transforms: [dropLessionCatalog, dropTopicCatalog] as any,
  // Persisted so the app opens with its data and never needs the network
  // after the first-run catalog sync.
  whitelist: ['userInfo', 'LessionSlice', 'HabitsSlide', 'TopicSlice', 'ThemeSlice'],
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
