import React from "react";

interface PaginationProps {
  currentPage: number;
  moviesPerPage: number;
  totalMovies: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, moviesPerPage, totalMovies, onPageChange }) => {
  return <div>Pagination</div>;
};

export default Pagination;
