import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, showRating = true }) {
  const imageUrl = movie.poster_path.startsWith("http")
    ? movie.poster_path
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <Link to={`/pelicula/${movie.id}`}>
        <img src={imageUrl} alt={movie.title || movie.name} />
        <h3>{movie.title || movie.name}</h3>
        {showRating && <p>Rating: {movie.vote_average}</p>}
      </Link>
    </div>
  );
}

export default MovieCard;
