import React, { FC, useState } from 'react';
import classes from './Categories.module.scss';
import { CategoriesButton } from '../UI/button/Button';

const Categories: FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const categories = ['Все', 'Iphone', 'IPad', 'IPod', 'Mac', 'AirPods'];

  return (
    <div className={classes.categories}>
      <div className={classes.categories__list}>
        {categories.map((value, index) => (
          <CategoriesButton
            key={value}
            onClick={() => setActiveCategory(index)}
            active={activeCategory === index && true}>
            {value}
          </CategoriesButton>
        ))}
      </div>
    </div>
  );
};

export default Categories;
