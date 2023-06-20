import { combineReducers, configureStore } from '@reduxjs/toolkit';

import chainReducer, { resetChain } from './reducers/chain';
import walletReducer, { resetWallet } from './reducers/wallet';
import securityReducer, { resetSecuritySettings } from './reducers/security';
import popupSlice from './reducers/popup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const reducers = combineReducers({
  chain: chainReducer,
  wallet: walletReducer,
  security: securityReducer,
  popup: popupSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const resetStore = () => {
  store.dispatch(resetWallet());
  store.dispatch(resetSecuritySettings());
  store.dispatch(resetChain());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
