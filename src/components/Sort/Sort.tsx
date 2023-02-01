import React, { FC, useState } from 'react';
import classes from './Sort.module.scss';
import clsx from 'clsx';

const Sort: FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<number>(0);
  const sortList = ['Популярности', 'Цене'];

  const onClickSort = (index: number) => {
    setActiveSort(index);
    setIsOpenPopup(!isOpenPopup);
  };

  return (
    <div className={classes.sort}>
      <div className={classes.sort__text} onClick={() => setIsOpenPopup(!isOpenPopup)}>
        Сортировка по: <span>{sortList[activeSort]}</span>
      </div>
      {isOpenPopup && (
        <div className={classes.sort__popup}>
          <ul className={classes.sort__list}>
            {sortList.map((sort, index) => (
              <li
                key={sort}
                onClick={() => onClickSort(index)}
                className={clsx(classes.sort__item, activeSort === index && classes.sort__active)}>
                {sort}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
