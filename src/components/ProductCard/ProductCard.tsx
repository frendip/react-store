import React, { FC, useState } from 'react';
import classes from './ProductCard.module.scss';
import { AddProductButton } from '../UI/button/Button';
import clsx from 'clsx';
import { IProduct } from '../types/types';

const ProductCard: FC<IProduct> = ({
  id,
  image,
  title,
  memory,
  colours,
  price,
  category,
  rating,
}) => {
  const [productCount, setProductCount] = useState<number>(0);
  const [activeMemory, setActiveMemory] = useState<number>(0);
  const [activeColour, setActiveColour] = useState<number>(0);

  return (
    <div className={classes.productCard}>
      <div className={classes.productCard__img}>
        <img src={require(`../../assets/img/${image}.png`)} alt="iphone14Pro" />
      </div>
      <div className={classes.productCard__title}>{title}</div>
      <div className={classes.productCard__selector}>
        <ul className={classes.productCard__selectorList}>
          {memory.map((mem, index) => (
            <li
              key={mem}
              onClick={() => setActiveMemory(index)}
              className={clsx(
                classes.productCard__selectorItem,
                activeMemory === index && classes.productCard__selectorActive,
              )}>
              {mem}
            </li>
          ))}
        </ul>
        <ul className={classes.productCard__selectorList}>
          {colours.map((colour, index) => (
            <li
              key={colour}
              onClick={() => setActiveColour(index)}
              className={clsx(
                classes.productCard__selectorItem,
                activeColour === index && classes.productCard__selectorActive,
              )}>
              {colour}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.productCard__button}>
        <div className={classes.productCard__price}>От {price} Р</div>
        <AddProductButton onClick={() => setProductCount((count) => count + 1)}>
          {productCount}
        </AddProductButton>
      </div>
    </div>
  );
};

export default ProductCard;
