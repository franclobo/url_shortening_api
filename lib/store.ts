import { configureStore } from '@reduxjs/toolkit';
import shorteningReducer from './features/shortening/shorteningSlice';

export const shorteningStore = () => {
  return configureStore({
    reducer: {
      shortening: shorteningReducer,
    },
  });
}

export type AppStore = ReturnType<typeof shorteningStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];


