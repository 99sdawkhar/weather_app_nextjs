import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/reducers'; // Create your rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;