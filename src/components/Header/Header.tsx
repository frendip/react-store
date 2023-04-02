import React, { FC } from 'react';
import classes from './Header.module.scss';
import basketLogo from '../../assets/img/icon-basket.png';
import iphoneLogo from '../../assets/img/icon-iphone2.png';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SearchInput } from '../UI/Input/Input';
import { CommonButton } from '../UI/Button/Button';
import clsx from 'clsx';

const Header: FC = () => {
  const { totalCount, totalPrice } = useAppSelector((state) => state.cart);
  const { pathname: path } = useLocation();
  return (
    <div className={classes.header}>
      <div className={classes.header__row}>
        <div className={classes.header__logo}>
          <Link to={'/'}>
            <div className={classes.header__img}>
              <img src={iphoneLogo} alt="phone" />
            </div>
          </Link>
          <div className={classes.header__col}>
            <h3 className={classes.header__title}>React Store</h3>
            <h5 className={classes.header__subtitle}>Самые лучшие цены!</h5>
          </div>
        </div>
        {path === '/' && (
          <>
            <SearchInput />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
