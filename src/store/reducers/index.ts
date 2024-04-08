import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from '@/store/reducers/weatherReducer';
import recentSearchesReducer from '@/store/reducers/recentSearchesReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  recentSearches: recentSearchesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;