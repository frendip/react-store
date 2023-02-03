import React, { FC } from 'react';
import classes from './Pagination.module.scss';
import { usePagination } from '../../../hooks/usePagination';
import { CommonButton } from '../Button/Button';

interface PaginationProps {
  totalPages: number;
  activePage: number;
  setActivePage: React.ComponentState;
}

const Pagination: FC<PaginationProps> = ({ totalPages, activePage, setActivePage }) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.pagination}>
      {pagesArray.map((page) => (
        <CommonButton
          variant={'secondary'}
          active={activePage === page}
          key={page}
          onClick={() => setActivePage(page)}>
          {page}
        </CommonButton>
      ))}
    </div>
  );
};

export default Pagination;
