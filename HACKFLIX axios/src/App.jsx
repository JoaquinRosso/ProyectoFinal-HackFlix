import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import MovieList from "./components/MovieList";
import RatingFilter from "./components/RatingFilter";

function App() {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9";

  // función que calcula el rating en base a la API
  const getVoteAverageFromRating = (stars) => {
    if (stars === 5) return 8;
    if (stars === 4) return 7;
    return stars * 2; // cubrir valores menores a 4
  };

  const fetchMovies = async (reset = false) => {
    try {
      const minVoteAverage = getVoteAverageFromRating(rating);

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&page=${page}&sort_by=popularity.desc&vote_average.gte=${minVoteAverage}&vote_count.gte=40`
      );
      const data = await response.data;

      if (data.results.length === 0) {
        setHasMore(false); // no hay más películas
      } else {
        setMovies((prevMovies) =>
          reset ? data.results : [...prevMovies, ...data.results]
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(true); // cargar la primera página o reiniciar al cambiar el filtro
  }, [rating]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(); // cargar más películas cuando se incrementa la página
    }
  }, [page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1); // incrementar la página con retraso
    }, 2500);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setPage(1); // reiniciar la página
    setHasMore(true); // permitir más scroll
    setMovies([]); // vaciar la lista de películas al cambiar el filtro
  };

  return (
    <div className="App">
      <h1>¡Tus películas favoritas!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="rating-filter">
        <RatingFilter rating={rating} onRatingChange={handleRatingChange} />
      </div>

      <InfiniteScroll
        dataLength={movies.length} // longitud de la lista de películas actual
        next={fetchMoreData} // función para cargar más datos
        hasMore={hasMore} // indicar si hay más películas para cargar
        loader={<p>Cargando más películas...</p>}
        endMessage={<p>No hay más películas para mostrar.</p>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
