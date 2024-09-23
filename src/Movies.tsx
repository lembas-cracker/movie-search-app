import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import "./Movies.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByQuery, fetchUpcomingMovies } from "./moviesSlice";
import { RootState, AppDispatch } from "./app/store";
import Pagination from "./components/Pagination";
import Sort from "./components/Sort";
import SearchForm from "./components/SearchForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const filteredMovies = useSelector((state: RootState) => state.movies.filteredMovies);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("By Popularity");
  const [order, setOrder] = useState<string>("desc");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const moviesPerPage = 6;

  const searchQuery = searchParams.get("search") || "";

  const fetchMovies = (page: number) => {
    if (searchQuery.trim()) {
      dispatch(fetchMoviesByQuery({ query: searchQuery, page }));
    } else {
      dispatch(fetchUpcomingMovies({ sortBy, order }));
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [dispatch, sortBy, order, searchQuery, currentPage]);

  //Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const searchedMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMovies(pageNumber);
  };

  const handleSort = (sortBy: string, order: string) => {
    setSortBy(sortBy);
    setOrder(order);
  };

  const handleSearch = (searchQuery: string) => {
    setCurrentPage(1); // Reset the current page so we start with the first one when searching

    if (searchQuery.trim()) {
      navigate(`?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("");
      searchQuery = "";
    }
  };

  return (
    <>
      <Navbar />
      <div className="movies-wrapper">
        <div className="movies-header">
          <SearchForm onSearch={handleSearch} initialQuery={searchQuery} />
          {!searchQuery && <Sort onSortChange={handleSort} />}
        </div>
        <div className="movies-container">
          {searchedMovies.length !== 0 && searchQuery
            ? searchedMovies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  loading={loading}
                />
              ))
            : currentMovies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  loading={loading}
                />
              ))}
        </div>
        <Pagination
          currentPage={currentPage}
          moviesPerPage={moviesPerPage}
          totalMovies={filteredMovies.length !== 0 ? filteredMovies.length : movies.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Movies;
