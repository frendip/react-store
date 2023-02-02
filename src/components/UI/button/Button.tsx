import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(classes.baseBtn, className)} {...props}>
      {children}
    </button>
  );
};

interface AddProductButtonProps extends BaseButtonProps {
  active?: boolean;
}

export const AddProductButton: FC<AddProductButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton {...props} className={classes.addProductBtn}>
      + Добавить{' '}
      {children !== 0 && <span className={classes.addProductBtn__count}>{children}</span>}
    </BaseButton>
  );
};

interface CommonButtonProps extends BaseButtonProps {
  active?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  borderWidth?: 'thin' | 'medium' | 'thick';
}

const variantStyle = {
  primary: classes.commonBtn__primary,
  secondary: classes.commonBtn__secondary,
};

const sizeStyle = {
  small: classes.commonBtn__sizeSmall,
  medium: classes.commonBtn__sizeMedium,
  large: classes.commonBtn__sizeLarge,
};

const borderWidthStyle = {
  thin: classes.commonBtn__borderThin,
  medium: classes.commonBtn__borderMedium,
  thick: classes.commonBtn__borderThick,
};

export const CommonButton: FC<CommonButtonProps> = ({
  children,
  active = false,
  size = 'small',
  variant = 'primary',
  borderWidth = 'thin',
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(
        classes.commonBtn,
        active && classes.commonBtn__active,
        variantStyle[variant],
        sizeStyle[size],
        borderWidthStyle[borderWidth],
      )}
      {...props}>
      {children}
    </BaseButton>
  );
};

interface CartItemButtonProps extends BaseButtonProps {
  action?: 'counter' | 'delete';
}

const actionStyle = {
  counter: classes.cartItemBtn__counter,
  delete: classes.cartItemBtn__delete,
};

export const CartItemButton: FC<CartItemButtonProps> = ({
  children,
  action = 'counter',
  ...props
}) => {
  return (
    <BaseButton className={clsx(classes.cartItemBtn, actionStyle[action])} {...props}>
      {children}
    </BaseButton>
  );
};
