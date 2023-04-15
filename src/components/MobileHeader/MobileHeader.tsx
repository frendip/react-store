import React, { useState } from 'react';
import classes from './MobileHeader.module.scss';
import Logo from '../Logo/Logo';
import Categories from '../Categories/Categories';
import BurgerButton from '../UI/BurgerButton/BurgerButton';
import clsx from 'clsx';

const MobileHeader = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  return (
    <div className={classes.mobileHeader}>
      <div className={classes.mobileHeader__row}>
        <BurgerButton menuActive={menuActive} setMenuActive={setMenuActive} />
        <nav
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className={clsx(
            classes.mobileHeader__categoriesMenu,
            menuActive && classes.mobileHeader__categoriesMenu_active,
          )}>
          <Categories className={classes.mobileHeader__categories} buttonSize={'large'} />
        </nav>
        <Logo className={classes.mobileHeader__logo} />
      </div>
    </div>
  );
};

export default MobileHeader;
