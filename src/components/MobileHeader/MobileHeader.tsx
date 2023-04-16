import React, { useState } from 'react';
import classes from './MobileHeader.module.scss';
import Logo from '../Logo/Logo';
import Categories from '../Categories/Categories';
import BurgerButton from '../UI/BurgerButton/BurgerButton';

const MobileHeader = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  return (
    <div className={classes.mobileHeader}>
      <div className={classes.mobileHeader__row}>
        <BurgerButton menuActive={menuActive} setMenuActive={setMenuActive} />
        {menuActive && (
          <nav
            onClick={() => {
              setMenuActive(!menuActive);
            }}
            className={classes.burgerMenu__container}>
            <Categories className={classes.burgerMenu__content} buttonSize={'large'} />
          </nav>
        )}
        <Logo className={classes.mobileHeader__logo} />
      </div>
    </div>
  );
};

export default MobileHeader;
