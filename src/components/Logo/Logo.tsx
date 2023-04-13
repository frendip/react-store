import React from 'react';
import classes from './Logo.module.scss';
import { Link } from 'react-router-dom';
import iphoneLogo from '../../assets/img/icon-iphone2.png';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <Link to={'/'}>
        <div className={classes.logo__img}>
          <img src={iphoneLogo} alt="phone" />
        </div>
      </Link>
      <div className={classes.logo__col}>
        <h3 className={classes.logo__title}>React Store</h3>
        <h5 className={classes.logo__subtitle}>Самые лучшие цены!</h5>
      </div>
    </div>
  );
};

export default Logo;
