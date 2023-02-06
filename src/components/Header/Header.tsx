import React, { FC, useContext } from 'react';
import clsx from 'clsx';
import classes from './Header.module.scss';
import iphoneLogo from '../../assets/img/icon-iphone2.png';
import basketLogo from '../../assets/img/icon-basket.png';
import { Link } from 'react-router-dom';
import { CommonButton } from '../UI/Button/Button';
import { SearchInput } from '../UI/Input/Input';
import { SearchContext } from '../../context/context';

const Header: FC = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
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
        <SearchInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={'Найти...'}
        />
        <Link to={'/cart'}>
          <CommonButton variant={'primary'} size={'medium'} borderWidth={'medium'}>
            <div className={clsx(classes.header__basket, classes.basket)}>
              <div className={classes.basket__price}>520 ₽</div>
              <div className={classes.basket__row}>
                <div className={classes.basket__img}>
                  <img src={basketLogo} alt="basket" />
                </div>
                <div className={classes.basket__count}>3</div>
              </div>
            </div>
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default Header;
