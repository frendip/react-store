import React, { FC } from 'react';
import classes from './Header.module.scss';
import basketLogo from '../../assets/img/icon-basket.png';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SearchInput } from '../UI/Input/Input';
import { CommonButton } from '../UI/Button/Button';
import clsx from 'clsx';
import Logo from '../Logo/Logo';

const Header: FC = () => {
  const { totalCount, totalPrice } = useAppSelector((state) => state.cart);
  const { pathname: path } = useLocation();
  return (
    <div className={classes.header}>
      <div className={classes.header__row}>
        <Logo />
        {path === '/' && <SearchInput />}
        <Link to={'/cart'}>
          <CommonButton variant={'primary'} size={'medium'} borderWidth={'medium'}>
            <div className={clsx(classes.header__basket, classes.basket)}>
              <div className={classes.basket__price}>{totalPrice} ₽</div>
              <div className={classes.basket__row}>
                <div className={classes.basket__img}>
                  <img src={basketLogo} alt="basket" />
                </div>
                <div className={classes.basket__count}>{totalCount}</div>
              </div>
            </div>
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default Header;
