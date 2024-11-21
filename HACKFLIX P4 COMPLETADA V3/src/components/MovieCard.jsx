import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <Link to={`/pelicula/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
