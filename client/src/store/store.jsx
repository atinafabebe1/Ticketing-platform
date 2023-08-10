import { configureStore } from '@reduxjs/toolkit';
import informationReduce from '../features/informationSlice';
import authReducer, { initializeAuth } from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    offInformation: informationReduce,
    auth: authReducer
  }
});

// store.dispatch(initializeAuth());

export default store;
