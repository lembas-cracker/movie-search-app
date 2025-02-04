import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import "./Movies.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByQuery, fetchUpcomingMovies } from "./moviesSlice";
import { RootState, AppDispatch } from "./app/store";
import Pagination from "./components/Pagination";
import Sort from "./components/Sort";
import SearchForm from "./components/SearchForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const filteredMovies = useSelector((state: RootState) => state.movies.filteredMovies);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortBy, setSortBy] = useState<string>("By Popularity");
  const [order, setOrder] = useState<string>("desc");
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

    if (searchQuery.trim()) {
      navigate(`?search=${encodeURIComponent(searchQuery)}&page=${pageNumber}`);
    } else {
      navigate(`?page=${pageNumber}`);
    }

    fetchMovies(pageNumber);
  };

  const handleSort = (sortBy: string, order: string) => {
    setSortBy(sortBy);
    setOrder(order);
  };

  const handleSearch = (searchQuery: string) => {
    setCurrentPage(1); // Reset the current page so we start with the first one when searching

    if (searchQuery.trim()) {
      navigate(`?search=${encodeURIComponent(searchQuery)}&page=1`);
    } else {
      navigate("");
      searchQuery = "";
    }
  };

  return (
    <>
      <div className="movies-wrapper">
        <div className="movies-header">
          <SearchForm onSearch={handleSearch} initialQuery={searchQuery} />
          {!searchQuery && !error && <Sort onSortChange={handleSort} />}
        </div>
        {error && (
          <div className="error-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Exclamation_encircled.svg/180px-Exclamation_encircled.svg.png?20130701134923"
              alt=""
              className="error-icon"
            />
            API не работает в России. Включите VPN, чтобы посмотреть контент.
          </div>
        )}
        <div className="movies-container">
          {loading
            ? // Render Skeleton components on initial load if loading is true
              Array.from({ length: 6 }).map((_, index) => (
                <div className="movie-card" key={index}>
                  <Skeleton key={index} height={"300px"} width={"200px"} className="skeleton" />
                  <div className="movie-info">
                    <Skeleton count={1} className="skeleton-title" width={"20vw"} />
                    <Skeleton count={3} className="skeleton-info" width={"20vw"} />
                    <Skeleton circle width={30} height={30} className="skeleton-info" />
                  </div>
                </div>
              ))
            : searchedMovies.length !== 0 && searchQuery
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
