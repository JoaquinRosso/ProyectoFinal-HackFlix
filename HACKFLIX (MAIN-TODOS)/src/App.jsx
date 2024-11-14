import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieList from "./components/MovieList";
import RatingFilter from "./components/RatingFilter";

function App() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movieIds, setMovieIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9";

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&page=${page}&sort_by=popularity.desc&vote_count.gte=40`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        const newMovies = data.results.filter((movie) => {
          if (!movieIds.has(movie.id)) {
            movieIds.add(movie.id);
            return true;
          }
          return false;
        });

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setMovieIds(new Set(movieIds));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 2500);
  };

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

      {loading && page === 1 ? (
        <p>Cargando películas...</p>
      ) : (
        <InfiniteScroll
          dataLength={filteredMovies.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Cargando más películas...</p>}
          endMessage={<p>No hay más películas para mostrar.</p>}
        >
          <MovieList movies={filteredMovies} /> {}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default App;
