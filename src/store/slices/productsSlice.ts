import { IProduct, ISort } from '../../components/types/types';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setTotalPages } from './paginationSlice';
import PostService from '../../API/PostService';

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
  async ({ activePage, limit, activeCategory, activeSort, searchValue }, { dispatch }) => {
    const productsCount = await PostService.getProductsCount(activeCategory, searchValue);
    dispatch(setTotalPages(Math.ceil(productsCount / limit)));

    return await PostService.getProducts(
      activePage,
      limit,
      activeCategory,
      activeSort.sortProperty,
      activeSort.order,
      searchValue,
    );
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
