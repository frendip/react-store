import { FC, InputHTMLAttributes } from 'react';
import iconMagnifier from '../../../assets/img/icon-magnifier.png';
import classes from './Input.module.scss';
import clsx from 'clsx';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput: FC<BaseInputProps> = ({ className, ...props }) => {
  return <input className={clsx(classes.baseInput, className)} {...props} />;
};

interface SearchInputProps extends BaseInputProps {}

export const SearchInput: FC<SearchInputProps> = (props) => {
  return (
    <div className={classes.searchInput}>
      <img className={classes.searchInput__img} src={iconMagnifier} alt="Magnifier" />
      <BaseInput {...props} className={classes.searchInput__search} />
    </div>
  );
};
