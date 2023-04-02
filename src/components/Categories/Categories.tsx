import React, { FC } from 'react';
import classes from './Categories.module.scss';
import { CommonButton } from '../UI/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setActiveCategory } from '../../store/slices/filterSlice';

const categories = ['Все', 'Iphone', 'IPad', 'Mac', 'AirPods'];

const Categories: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.filter.activeCategory);

  return (
    <div className={classes.categories}>
      <div className={classes.categories__list}>
        {categories.map((value, index) => (
          <CommonButton
            key={value}
            onClick={() => dispatch(setActiveCategory(index))}
            active={activeCategory === index}
            variant={'primary'}
            size={'small'}
            borderWidth={'medium'}>
            {value}
          </CommonButton>
        ))}
      </div>
    </div>
  );
});

export default Categories;
