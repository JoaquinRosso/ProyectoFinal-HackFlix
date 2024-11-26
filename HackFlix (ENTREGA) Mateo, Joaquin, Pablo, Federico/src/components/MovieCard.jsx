import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, showRating = true }) {
  const imageUrl = movie?.poster_path
    ? movie.poster_path.startsWith("http")
      ? movie.poster_path
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <Link to={`/pelicula/${movie.id}`}>
        <img src={imageUrl} alt={movie.title || movie.name || "No Title"} />
        <h3>{movie.title || movie.name || "Untitled Movie"}</h3>
        {showRating && movie?.vote_average !== undefined && (
          <p>Rating: {movie.vote_average}</p>
        )}
      </Link>
    </div>
  );
}

export default MovieCard;
