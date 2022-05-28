import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/UserSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})