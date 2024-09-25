import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { DOTS, usePagination } from './hook';

interface IPaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Paginations = (props: IPaginationProps): JSX.Element | null => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    (paginationRange !== undefined && paginationRange.length < 2)
  ) {
    return null;
  }

  const onNext = (): void => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={onPrevious} className='cursor-pointer'>
          <PaginationPrevious />
        </PaginationItem>
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={Math.random()}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              onClick={() => onPageChange(Number(pageNumber))}
              key={Math.random()}
            >
              <PaginationLink isActive={currentPage === pageNumber}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem onClick={onNext} className='cursor-pointer'>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
