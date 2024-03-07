import { FC, useMemo } from "react";
import {
  PaginationContainer,
  PaginationButton,
  NavigationButton,
} from "./Pagination.styled";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNavigation = (step: number) => {
    const newPage = currentPage + step;
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const pages = useMemo(() => {
    const pageArray = [1];

    const addPage = (page: number) => {
      if (!pageArray.includes(page)) {
        pageArray.push(page);
      }
    };

    const addEllipsisIfNeeded = (start: number, end: number) => {
      if (end - start > 1) {
        pageArray.push(-1);
      }
    };

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(currentPage + 1, totalPages - 1);

    addEllipsisIfNeeded(1, start);
    for (let i = start; i <= end; i++) {
      addPage(i);
    }
    addEllipsisIfNeeded(end, totalPages);

    if (totalPages !== 1) {
      addPage(totalPages);
    }

    return pageArray;
  }, [currentPage, totalPages]);

  return (
    <PaginationContainer>
      <NavigationButton
        disabled={currentPage === 1}
        onClick={() => {
          handleNavigation(-1);
        }}
      >
        Prev
      </NavigationButton>
      {pages.map((page, index) => {
        if (page === -1) {
          return (
            <PaginationButton key={index} disabled>
              ...
            </PaginationButton>
          );
        }
        return (
          <PaginationButton
            key={index}
            selected={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationButton>
        );
      })}
      <NavigationButton
        disabled={currentPage === totalPages}
        onClick={() => {
          handleNavigation(1);
        }}
      >
        Next
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
