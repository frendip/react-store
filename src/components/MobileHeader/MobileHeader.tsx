import React, { useState } from 'react';
import classes from './MobileHeader.module.scss';
import Logo from '../Logo/Logo';
import BurgerButton from '../UI/BurgerButton/BurgerButton';
import SearchPopup from '../SearchPopup/SearchPopup';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';

const MobileHeader = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [popupActive, setPopupActive] = useState<boolean>(false);
  return (
    <div className={classes.mobileHeader}>
      <div className={classes.mobileHeader__row}>
        <BurgerButton menuActive={menuActive} setMenuActive={setMenuActive} />
        <CategoriesMenu menuActive={menuActive} setMenuActive={setMenuActive} />
        <div onClick={() => setPopupActive(!popupActive)}>123</div>
        <SearchPopup popupActive={popupActive} setPopupActive={setPopupActive} />
        <Logo className={classes.mobileHeader__logo} />
      </div>
    </div>
  );
};

export default MobileHeader;
