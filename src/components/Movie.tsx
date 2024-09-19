import React, { Suspense, useEffect, useRef, useState } from "react";
import "./Movie.css";
import Skeleton from "react-loading-skeleton";

interface MovieProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  loading: boolean;
}

const Movie: React.FC<MovieProps> = ({ id, title, overview, poster_path, release_date, vote_average, loading }) => {
  const ringRef = useRef<HTMLDivElement>(null);

  const [isImageLoading, setIsImageLoading] = useState(true);

  const setCSSProgressRing = (rating: number) => {
    const ring = ringRef.current;

    // Cap the rating between 0 and 10
    rating = Math.max(0, Math.min(10, rating));

    // Calculate the percentage (0-100) based on the rating (0-10)
    const percentage = (rating / 10) * 100;

    // Update the CSS variable and the text
    ring?.style.setProperty("--percentage", "" + percentage);
  };

  useEffect(() => {
    setCSSProgressRing(vote_average);
  }, [vote_average]);

  return (
    <div className="movie-card">
      {(loading || isImageLoading) && <Skeleton height={"300px"} width={"200px"} className="skeleton" />}

      {!loading && (
        <div className="movie-img-container" style={isImageLoading ? { display: "none" } : {}}>
          <img
            src={
              !poster_path
                ? "https://parniangostar.com/_next/static/media/imgFallBack.581a9fe3.png"
                : `https://image.tmdb.org/t/p/w500${poster_path}`
            }
            onLoad={() => setIsImageLoading(false)}
            alt={title}
          />
        </div>
      )}

      <div className="movie-info">
        {loading ? (
          <Skeleton count={1} className="skeleton-title" width={"20vw"} />
        ) : (
          <h2 className="movie-title">{title}</h2>
        )}
        {loading ? (
          <>
            <Skeleton count={3} className="skeleton-info" width={"20vw"} />
            <Skeleton circle width={30} height={30} className="skeleton-info" />
          </>
        ) : (
          <>
            <div className="movie-rating">
              <p className="movie-release-date">Release Date: {release_date || "N/A"}</p>
              <div className="rating-container">
                <div ref={ringRef} className="progress-ring" data-id={id} data-rating="7">
                  <span className="rating-text">
                    {typeof vote_average === "number" && !isNaN(vote_average)
                      ? vote_average.toFixed(1) === "0.0"
                        ? "N/A"
                        : vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <p className="movie-overview">{!overview ? "Description not available at the moment" : overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Movie;
