import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import RatingFilter from "./components/RatingFilter";

function App() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&page=1&sort_by=popularity.desc&vote_count.gte=40`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const filteredMovies = movies.filter((movie) => {
    if (rating === 5) return movie.vote_average >= 9;
    if (rating === 4) return movie.vote_average >= 7;
    return movie.vote_average >= rating * 2;
  });

  return (
    <div className="App">
      <h1>¡Tus películas favoritas!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="rating-filter">
        <RatingFilter rating={rating} onRatingChange={handleRatingChange} />
      </div>

      {loading ? (
        <p>Cargando películas...</p>
      ) : filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <p>
          Lo sentimos, no se encontraron películas con el rating solicitado.
        </p>
      )}
    </div>
  );
}

export default App;
