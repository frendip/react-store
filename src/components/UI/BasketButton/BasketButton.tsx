import React from 'react';
import classes from './BasketButton.module.scss';
import basketLogo from '../../../assets/img/icon-basket.png';
import { CommonButton } from '../Button/Button';
import { useAppSelector } from '../../../hooks/useAppSelector';

const BasketButton = () => {
  const { totalCount, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <CommonButton variant={'primary'} size={'medium'} borderWidth={'medium'}>
      <div className={classes.basketButton}>
        <div className={classes.basketButton__price}>{totalPrice} ₽</div>
        <div className={classes.basketButton__row}>
          <div className={classes.basketButton__img}>
            <img src={basketLogo} alt="basket" />
          </div>
          <div className={classes.basketButton__count}>{totalCount}</div>
        </div>
      </div>
    </CommonButton>
  );
};

export default BasketButton;
