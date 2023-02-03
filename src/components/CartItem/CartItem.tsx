import React from 'react';
import productImg from '../../assets/img/iphone14ProMax.png';
import classes from './CartItem.module.scss';
import clsx from 'clsx';
import { CartItemButton } from '../UI/Button/Button';

const CartItem = () => {
  return (
    <div className={classes.cartItem}>
      <div className={clsx(classes.cartItem__product, classes.product)}>
        <div className={classes.product__img}>
          <img src={productImg} alt="product IMG" />
        </div>
        <div className={classes.product__col}>
          <h3 className={classes.product__name}>Iphone 14 Pro Max</h3>
          <div className={classes.product__configuration}>128 GB, Фиолетовый</div>
        </div>
      </div>
      <div className={clsx(classes.cartItem__count, classes.count)}>
        <CartItemButton action={'counter'}>-</CartItemButton>
        <div className={classes.count__number}>3</div>
        <CartItemButton action={'counter'}>+</CartItemButton>
      </div>
      <div className={classes.cartItem__amount}>80000 ₽</div>
      <CartItemButton action={'delete'}>X</CartItemButton>
    </div>
  );
};

export default CartItem;
