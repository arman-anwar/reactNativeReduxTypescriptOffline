import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  todoList: todoReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
