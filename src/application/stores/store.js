import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import getUserReducer from './getUserSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    getUser: getUserReducer,
  },
});
