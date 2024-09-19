import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  moviesPerPage: number;
  totalMovies: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, moviesPerPage, totalMovies, onPageChange }) => {
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const amountOfPages = [];
  for (let i = 1; i <= totalPages; i++) amountOfPages.push(i);

  return (
    <div className="pagination">
      <button className="pagination-button" onClick={handlePrevClick} disabled={currentPage === 1}>
        <span className="pagination-arrow">&lt;</span>
      </button>
      {amountOfPages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button className="pagination-button" onClick={handleNextClick} disabled={currentPage === totalPages}>
        <span className="pagination-arrow">&gt;</span>
      </button>
    </div>
  );
};

export default Pagination;
