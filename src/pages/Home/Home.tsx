import React, { useContext, useEffect, useRef } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort, { sortList } from '../../components/Sort/Sort';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/UI/Pagination/Pagination';

import { SearchContext } from '../../context/context';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setActivePage } from '../../store/slices/paginationSlice';

import classes from './Home.module.scss';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFiltersFromUrl } from '../../store/slices/filterSlice';
import { fetchProducts } from '../../store/slices/productsSlice';

const Home = () => {
  const { products, status } = useAppSelector((state) => state.products);
  const { activeCategory, activeSort } = useAppSelector((state) => state.filter);
  const { activePage, totalPages, limit } = useAppSelector((state) => state.pagination);
  const { searchValue } = useContext(SearchContext);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const countRendering = useRef(0);

  useEffect(() => {
    if (countRendering.current > 1) {
      const queryString = qs.stringify({
        activeCategory,
        activeSortProperty: activeSort.sortProperty,
        activeSortOrder: activeSort.order,
        activePage,
      });

      navigate(`?${queryString}`);
    }

    if (countRendering.current < 2) {
      countRendering.current++;
    }
  }, [activeCategory, activeSort, activePage]);

  useEffect(() => {
    if (window.location.search) {
      const UrlParams = qs.parse(window.location.search.substring(1));

      const category = Number(UrlParams.activeCategory);
      const sort = sortList.find(
        (sort) =>
          sort.sortProperty === UrlParams.activeSortProperty &&
          sort.order === UrlParams.activeSortOrder,
      );
      const page = Number(UrlParams.activePage);

      if (sort) {
        dispatch(setFiltersFromUrl({ category, sort }));
        dispatch(setActivePage(page));
      }

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [activeCategory, searchValue]);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        fetchProducts({
          activePage,
          limit,
          activeCategory,
          activeSort,
          searchValue,
        }),
      );
    }
    isSearch.current = false;
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
        {status === 'loading' || status === 'error'
          ? [...new Array(8)].map((value, index) => <ProductCardSkeleton key={index} />)
          : products.map((obj) => <ProductCard key={obj.id} {...obj} />)}
      </div>
      {totalPages > 1 && <Pagination />}
    </>
  );
};

export default Home;
