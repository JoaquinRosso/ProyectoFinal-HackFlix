import React from "react";
import movies from "../data/movies"; // Import the recommendations data
import MovieCard from "./MovieCard"; // Reuse MovieCard for individual movies

function Recommendations() {
  return (
    <div className="recommendations-page">
      <h1>Películas Recomendadas</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieCard movie={movie} showRating={false} />
            {}
            <p>
              <strong>Review:</strong> {movie.plot}
            </p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
