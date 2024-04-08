import { createSlice } from '@reduxjs/toolkit';

interface RecentSearchesState {
  searches: string[];
}

const initialState: RecentSearchesState = {
  searches: [],
};

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      if (!state.searches.includes(action.payload)) {
        state.searches.unshift(action.payload);
        if (state.searches.length > 5) {
          state.searches.pop();
        }
      }
    },
  },
});

export const { addSearch } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
