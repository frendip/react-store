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

interface CategoriesButtonProps extends BaseButtonProps {
  active?: boolean;
}

export const CategoriesButton: FC<CategoriesButtonProps> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      className={clsx(classes.categoriesBtn, active && classes.categoriesBtn__active)}>
      {children}
    </BaseButton>
  );
};

interface AddProductButtonProps extends BaseButtonProps {
  active?: boolean;
}

export const AddProductButton: FC<AddProductButtonProps> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <BaseButton
      {...props}
      className={clsx(classes.addProductBtn, active && classes.addProductBtn__active)}>
      + Добавить{' '}
      {children !== 0 && <span className={classes.addProductBtn__count}>{children}</span>}
    </BaseButton>
  );
};

interface CommonButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const variantStyle = {
  primary: classes.commonBtn__primary,
  secondary: classes.commonBtn__secondary,
};

const sizeStyle = {
  small: classes.commonBtn__small,
  medium: classes.commonBtn__medium,
  large: classes.commonBtn__large,
};

export const CommonButton: FC<CommonButtonProps> = ({
  children,
  size = 'small',
  variant = 'primary',
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(classes.commonBtn, variantStyle[variant], sizeStyle[size])}
      {...props}>
      {children}
    </BaseButton>
  );
};
