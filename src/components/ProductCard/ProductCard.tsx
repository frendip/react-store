import React, { FC, useState } from 'react';
import classes from './ProductCard.module.scss';
import { AddProductButton } from '../UI/Button/Button';
import clsx from 'clsx';
import { IProduct, IProductCart } from '../types/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addProduct } from '../../store/slices/cartSlice';

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
  const [activeMemory, setActiveMemory] = useState<number>(0);
  const [activeColour, setActiveColour] = useState<number>(0);

  const productProps: IProductCart = {
    id,
    image,
    title,
    memory: memory[activeMemory],
    colour: colours[activeColour],
    price,
    category,
    rating,
    count: 1,
  };

  const dispatch = useAppDispatch();
  const productArr = useAppSelector((state) =>
    state.cart.products.filter((product) => product.id === id),
  );

  const productCount = productArr
    ? productArr.reduce((count, product) => product.count + count, 0)
    : 0;

  return (
    <div className={classes.productCard}>
      <div className={classes.productCard__img}>
        <img src={require(`../../assets/img/${image}.png`)} alt="product" />
      </div>
      <div className={classes.productCard__title}>{title}</div>
      <div className={classes.productCard__selector}>
        {memory.length !== 0 && (
          <ul className={classes.productCard__selectorList}>
            {memory.map((mem, index) => (
              <li
                key={mem}
                onClick={() => setActiveMemory(index)}
                className={clsx(
                  classes.productCard__selectorItem,
                  activeMemory === index && classes.productCard__selectorActive,
                )}>
                {mem} GB
              </li>
            ))}
          </ul>
        )}
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
        <div className={classes.productCard__price}>От {price} ₽</div>
        <AddProductButton onClick={() => dispatch(addProduct(productProps))}>
          {productCount}
        </AddProductButton>
      </div>
    </div>
  );
};

export default ProductCard;
