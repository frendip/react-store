import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISort } from '../../components/types/types';

interface filterState {
  activeCategory: number;
  activeSort: ISort;
}

const initialState: filterState = {
  activeCategory: 0,
  activeSort: {
    name: 'Популярности (по убыванию)',
    sortProperty: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<ISort>) {
      state.activeSort = action.payload;
    },
    setFiltersFromUrl(state, action: PayloadAction<{ category: number; sort: ISort }>) {
      state.activeCategory = action.payload.category;
      state.activeSort = action.payload.sort;
    },
  },
});

export const { setActiveCategory, setActiveSort, setFiltersFromUrl } = filterSlice.actions;

export default filterSlice.reducer;
