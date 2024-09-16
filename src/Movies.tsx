import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import "./Movies.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingMovies } from "./moviesSlice";
import { RootState, AppDispatch } from "./app/store";
import Pagination from "./components/Pagination";

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  //Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="movies-wrapper">
      <Navbar />
      <div className="movies-container">
        {currentMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
