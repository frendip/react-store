import React, { useContext, useEffect, useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/UI/Pagination/Pagination';

import { IProduct } from '../../components/types/types';

import { useFetching } from '../../hooks/useFetching';
import PostService from '../../API/PostService';

import { SearchContext } from '../../context/context';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setActivePage, setTotalPages } from '../../store/slices/paginationSlice';

import classes from './Home.module.scss';

const Home = () => {
  const { activeCategory, activeSort } = useAppSelector((state) => state.filter);
  const { activePage, totalPages, limit } = useAppSelector((state) => state.pagination);

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<IProduct[]>([]);

  const { searchValue } = useContext(SearchContext);

  const [fetchProducts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getProducts(
      activePage,
      limit,
      activeCategory,
      activeSort.sortProperty,
      activeSort.order,
      searchValue,
    );
    setProducts(response);
  });

  const [fetchProductsLength] = useFetching(async () => {
    const totalCountProducts = await PostService.getProductsCount(activeCategory, searchValue);
    dispatch(setTotalPages(Math.ceil(totalCountProducts / limit)));
  });

  useEffect(() => {
    fetchProductsLength().then();
    dispatch(setActivePage(1));
  }, [activeCategory, searchValue]);

  useEffect(() => {
    fetchProducts().then();
  }, [activeCategory, activeSort, activePage, searchValue]);

  /*
  Если нужно чтобы SeachInput работал без помощи запроса к бд
  const productsArray = products
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => <ProductCard key={obj.id} {...obj} />);
  */

  return (
    <>
      <div className={classes.top}>
        <Categories />
        <Sort />
      </div>
      <div className={classes.title}>Все товары</div>
      <div className={classes.items}>
        {isLoading || error
          ? [...new Array(8)].map((value, index) => <ProductCardSkeleton key={index} />)
          : products.map((obj) => <ProductCard key={obj.id} {...obj} />)}
      </div>
      {totalPages > 1 && <Pagination />}
    </>
  );
};

export default Home;
