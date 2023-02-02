import React, { useEffect, useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import ProductCardSkeleton from '../../components/ProductCardSkeleton/ProductCardSkeleton';
import ProductCard from '../../components/ProductCard/ProductCard';
import { IProduct } from '../../components/types/types';
import { useFetching } from '../../hooks/useFetching';
import PostService from '../../API/PostService';
import classes from './Home.module.scss';

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSort, setActiveSort] = useState<number>(0);

  const [fetchProducts, isLoading] = useFetching(async () => {
    const response = await PostService.getProducts(activeCategory);
    setProducts(response);
  });

  useEffect(() => {
    fetchProducts().then();
    window.scrollTo(0, 0);
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
    </>
  );
};

export default Home;
