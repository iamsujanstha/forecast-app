import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from '../services/weather';
import notificationReducer from "../features/notification/slice";
import { rtkQueryErrorLogger } from './rtkQueryErrorMiddleware';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch