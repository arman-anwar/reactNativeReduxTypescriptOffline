import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slice/userReducer';
import createSagaMiddleware from 'redux-saga'
import saga from './saga/saga'
import { reducer as network } from 'react-native-offline';
import createOfflineMiddleware from './offlineMiddleware';
import TYPES from './types';

const sagaMiddleware = createSagaMiddleware();


// console.log('postReducer>> ' , postReducer.reducer)
const {
  handleOfflineActionsMiddleware,
  networkMiddleware,
} = createOfflineMiddleware({
  actionTypes: [
    TYPES.DEL_USERS_REQUEST,
    TYPES.CREATE_USERS_REQUEST,
    'users/updateUserRequest'
  ],
});

const persistConfig = {
  key: 'root',
  version: 2,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  users: userReducer,
  network,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    handleOfflineActionsMiddleware,
    networkMiddleware,
    sagaMiddleware,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

sagaMiddleware.run(saga)

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
