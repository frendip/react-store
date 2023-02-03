import React, { useEffect, useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import ProductCard from '../../components/ProductCard/ProductCard';
import { IProduct, ISort } from '../../components/types/types';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../API/PostService';
import classes from './Home.module.scss';
import Pagination from '../../components/UI/Pagination/Pagination';

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSort, setActiveSort] = useState<ISort>({
    name: 'Популярности (по убыванию)',
    sortProperty: 'rating',
    order: 'desc',
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const limit = 8;

  const [fetchProducts, isLoading] = useFetching(async () => {
    const response = await PostService.getProducts(
      activePage,
      limit,
      activeCategory,
      activeSort.sortProperty,
      activeSort.order,
    );
    setProducts(response);
  });

  const [fetchProductsLength] = useFetching(async () => {
    const totalCountProducts = await PostService.getProductsCount(activeCategory);
    setTotalPages(Math.ceil(totalCountProducts / limit));
  });

  useEffect(() => {
    fetchProducts().then();
  }, [activeCategory, activeSort, activePage]);

  useEffect(() => {
    fetchProductsLength().then();
    setActivePage(1);
  }, [activeCategory]);

  return (
    <>
      <div className={classes.top}>
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>
      <div className={classes.title}>Все товары</div>
      <div className={classes.items}>
        {isLoading
          ? [...new Array(8)].map((value, index) => <ProductCardSkeleton key={index} />)
          : products.map((obj) => <ProductCard key={obj.id} {...obj} />)}
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} activePage={activePage} setActivePage={setActivePage} />
      )}
    </>
  );
};

export default Home;
