import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/reducers'; // Create your rootReducer
import { useDispatch } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';


const store = configureStore({
  reducer: rootReducer,
});

export default store;
