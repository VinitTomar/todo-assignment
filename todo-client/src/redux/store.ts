import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo-slice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});