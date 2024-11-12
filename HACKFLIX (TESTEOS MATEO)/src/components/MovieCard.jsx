import React from "react";

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;
