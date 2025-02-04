import React, { useState } from "react";
import Pagination, { PaginationProps } from "../components/Pagination";

const PaginationWrapper: React.FC<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      moviesPerPage={props.moviesPerPage}
      totalMovies={props.totalMovies}
    />
  );
};

export default PaginationWrapper;
