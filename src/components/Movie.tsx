import React, { useEffect, useRef } from "react";
import "./Movie.css";

interface MovieProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Movie: React.FC<MovieProps> = ({ id, title, overview, poster_path, release_date, vote_average }) => {
  const ringRef = useRef(null);

  const setCSSProgressRing = (rating: number) => {
    const ring: any = ringRef.current;

    // Cap the rating between 0 and 10
    rating = Math.max(0, Math.min(10, rating));

    // Calculate the percentage (0-100) based on the rating (0-10)
    const percentage = (rating / 10) * 100;

    // Update the CSS variable and the text
    ring.style.setProperty("--percentage", percentage);
  };

  useEffect(() => {
    setCSSProgressRing(vote_average);
  }, [vote_average]);

  return (
    <div className="movie-card">
      <div className="movie-img-container">
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      </div>

      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <div className="movie-rating">
          <p>Release Date: {release_date}</p>
          <div className="rating-container">
            <div ref={ringRef} className="progress-ring" data-id={id} data-rating="7">
              <span className="rating-text">{vote_average.toFixed(1)}</span>
            </div>
          </div>
          {/*<p>Rating: {vote_average.toFixed(1)}</p>*/}
        </div>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
