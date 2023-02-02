import React from 'react';
import iconCart from '../../assets/img/icon-cart.png';
import iconTrash from '../../assets/img/icon-trash.png';
import { BaseButton, CommonButton } from '../../components/UI/button/Button';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import classes from './Cart.module.scss';

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.cartContainer}>
      <div className={classes.top}>
        <div className={classes.title}>
          <div className={classes.title__img}>
            <img src={iconCart} alt="icon-cart" />
          </div>
          <h1 className={classes.title__text}>Корзина</h1>
        </div>
        <BaseButton>
          <div className={classes.clearCartBtn}>
            <div className={classes.clearCartBtn__img}>
              <img src={iconTrash} alt="icon-trash" />
            </div>
            <div className={classes.clearCartBtn__text}>Очистить корзину</div>
          </div>
        </BaseButton>
      </div>
      <div className={classes.items}>
        {[...new Array(3)].map((value, index) => (
          <React.Fragment key={index}>
            <div className={classes.dividingLine} />
            <CartItem />
          </React.Fragment>
        ))}
      </div>
      <div className={classes.paymentInfo}>
        <div className={classes.paymentInfo__productCount}>
          Всего девайсов: <span>3 шт.</span>
        </div>
        <div className={classes.paymentInfo__orderAmount}>
          Сумма заказа: <span>900 ₽</span>
        </div>
      </div>
      <div className={classes.buttons}>
        <CommonButton
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'medium'}
          borderWidth={'medium'}>
          Вернуться назад
        </CommonButton>
        <CommonButton variant={'secondary'} size={'medium'} borderWidth={'medium'}>
          Оплатить сейчас
        </CommonButton>
      </div>
    </div>
  );
};

export default Cart;
