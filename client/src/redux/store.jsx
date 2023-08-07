import { configureStore } from '@reduxjs/toolkit';
import informationReduce from './informationSlice';

export const store = configureStore({
  reducer: {
    offInformation: informationReduce
  }
});
