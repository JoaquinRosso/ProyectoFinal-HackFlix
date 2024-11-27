import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import MovieList from "./MovieList";
import Navbar from "./Navbar";

function Home() {
  const [sortAsc, setSortAsc] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [rating, setRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9";
  const getVoteAverageFromRating = (stars) => {
    if (stars === 5) return 8;
    if (stars === 4) return 7;
    if (stars === 1) return 4;
    return stars * 2;
  };

  const fetchMovies = async (reset = false) => {
    try {
      const minVoteAverage = getVoteAverageFromRating(rating);

      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=false&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&vote_average.gte=${minVoteAverage}&vote_count.gte=40&include_adult=false&page=${page}&sort_by=popularity.desc`;

      const response = await axios.get(endpoint);
      const data = response.data;

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        const filteredMovies = data.results.filter(
          (movie) => movie.vote_average >= minVoteAverage
        );

        setMovies((prevMovies) =>
          reset ? filteredMovies : [...prevMovies, ...filteredMovies]
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  const quickSort = (array, key, asc = true) => {
    if (array.length <= 1) return array;
    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      if (asc ? array[i][key] < pivot[key] : array[i][key] > pivot[key]) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    return [...quickSort(left, key, asc), pivot, ...quickSort(right, key, asc)];
  };

  const toggleSortOrder = () => {
    const sortedMovies = quickSort(movies, "release_date", sortAsc);
    setMovies(sortedMovies);
    setSortAsc(!sortAsc);
    setIsSorted(true);
  };

  const resetFilters = () => {
    setRating(0);
    setSearchTerm("");
    setPage(1);
    setHasMore(true);
    setSortAsc(true);
    setIsSorted(false);
    fetchMovies(true);
  };

  useEffect(() => {
    fetchMovies(true);
  }, [rating, searchTerm]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies();
    }
  }, [page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 2500);
  };

  return (
    <div className="App">
      <Navbar
        rating={rating}
        onRatingChange={setRating}
        onSearch={(term) => {
          setSearchTerm(term);
          setPage(1);
          setHasMore(true);
          setMovies([]);
        }}
      />
      <div className="sort-container">
        <button onClick={toggleSortOrder} className="btn btn-primary">
          Ordenar por Año ({sortAsc ? "Ascendente" : "Descendente"})
        </button>
        <button onClick={resetFilters} className="btn btn-secondary">
          Restablecer Filtros
        </button>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Cargando más películas...</p>}
        endMessage={<p>No hay más películas para mostrar.</p>}
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
}

export default Home;
