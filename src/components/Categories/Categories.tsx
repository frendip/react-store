import React, { FC } from 'react';
import classes from './Categories.module.scss';
import { CommonButton } from '../UI/button/Button';

interface CategoriesProps {
  activeCategory: number;
  setActiveCategory: React.ComponentState;
}

const Categories: FC<CategoriesProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Все', 'Iphone', 'IPad', 'Mac', 'AirPods'];

  return (
    <div className={classes.categories}>
      <div className={classes.categories__list}>
        {categories.map((value, index) => (
          <CommonButton
            key={value}
            onClick={() => setActiveCategory(index)}
            active={activeCategory === index && true}
            variant={'primary'}
            size={'small'}
            borderWidth={'medium'}>
            {value}
          </CommonButton>
        ))}
      </div>
    </div>
  );
};

export default Categories;
