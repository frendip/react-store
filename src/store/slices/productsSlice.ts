import { IProduct, ISort } from '../../components/types/types';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setActivePage, setTotalPages } from './paginationSlice';
import { RootState } from '../store';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  {
    activePage: number;
    limit: number;
    activeCategory: number;
    activeSort: ISort;
    searchValue: string;
  }
>(
  'products/fetchProducts',
  async ({ activePage, limit, activeCategory, activeSort, searchValue }) => {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?page=${activePage}&limit=${limit}${category}&sortBy=${activeSort.sortProperty}&order=${activeSort.order}${search}`;
    const response = await fetch(url);
    return await response.json();
  },
);

export const fetchProductsCount = createAsyncThunk<
  void,
  { activeCategory: number; searchValue: string },
  { state: RootState }
>(
  'products/fetchProductsCount',
  async ({ activeCategory, searchValue }, { dispatch, getState }) => {
    const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const url = `https://63d78ad7afbba6b7c93f22b1.mockapi.io/products?${category}${search}`;
    const response = await fetch(url);
    const result = await response.json();
    const limit = getState()['pagination'].limit;
    dispatch(setTotalPages(Math.ceil(result.length / limit)));
    dispatch(setActivePage(1));
  },
);

interface productsState {
  products: IProduct[];
  status: 'loading' | 'success' | 'error';
}

const initialState: productsState = {
  products: [],
  status: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
        state.products = [];
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'success';
      })
      .addMatcher(isError, (state) => {
        state.status = 'error';
      });
  },
});

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

const isFulfilled = (action: AnyAction) => {
  return action.type.endsWith('fulfilled');
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export default productsSlice.reducer;
