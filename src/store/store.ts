import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import paginationSlice from './slices/paginationSlice';
import cartSlice from './slices/cartSlice';
import productsSlice from './slices/productsSlice';

const store = configureStore({
  reducer: {
    filter: filterSlice,
    pagination: paginationSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
