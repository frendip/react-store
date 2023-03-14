import React, { useContext, useEffect, useRef, useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort, { sortList } from '../../components/Sort/Sort';
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
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFiltersFromUrl } from '../../store/slices/filterSlice';

const Home = () => {
  const { activeCategory, activeSort } = useAppSelector((state) => state.filter);
  const { activePage, totalPages, limit } = useAppSelector((state) => state.pagination);
  const { searchValue } = useContext(SearchContext);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const countRendering = useRef(0);

  const [products, setProducts] = useState<IProduct[]>([]);

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
    fetchProductsLength().then();
    dispatch(setActivePage(1));
  }, [activeCategory, searchValue]);

  useEffect(() => {
    if (!isSearch.current) {
      fetchProducts().then();
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
        {isLoading || error
          ? [...new Array(8)].map((value, index) => <ProductCardSkeleton key={index} />)
          : products.map((obj) => <ProductCard key={obj.id} {...obj} />)}
      </div>
      {totalPages > 1 && <Pagination />}
    </>
  );
};

export default Home;
