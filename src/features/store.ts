import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slice/todoReducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slice/userReducer';
import createSagaMiddleware from 'redux-saga'
import saga from './saga/saga'

const rootReducer = combineReducers({
  todoList: todoReducer,
  users: userReducer,
})

const sagaMiddleware = createSagaMiddleware()


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [sagaMiddleware]
})

sagaMiddleware.run(saga)
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
