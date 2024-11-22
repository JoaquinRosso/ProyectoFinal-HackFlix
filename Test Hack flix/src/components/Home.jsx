import React, { useState, useEffect } from "react"; // importa react y los hooks useState y useEffect para manejar el estado y efectos secundarios del componente
import InfiniteScroll from "react-infinite-scroll-component"; // importa el componente para implementar scroll infinito
import axios from "axios"; // importa axios para realizar peticiones http
import MovieList from "./MovieList"; // importa el componente que muestra la lista de peliculas
import Navbar from "./Navbar"; // importa el componente de la barra de navegacion que contiene el filtro de busqueda y calificacion

function Home() {
  const [rating, setRating] = useState(0); // define el estado de la calificacion (rating) de las peliculas
  const [searchTerm, setSearchTerm] = useState(""); // define el estado del termino de busqueda
  const [movies, setMovies] = useState([]); // define el estado de las peliculas, inicialmente vacio
  const [page, setPage] = useState(1); // define el estado de la pagina actual para la paginacion
  const [hasMore, setHasMore] = useState(true); // define si hay mas peliculas para cargar o no
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9"; // clave api para acceder a la base de datos de peliculas

  const getVoteAverageFromRating = (stars) => {
    // funcion que convierte el numero de estrellas seleccionadas en un valor de calificacion minima para filtrar peliculas
    if (stars === 5) return 8;
    if (stars === 4) return 7;
    if (stars === 1) return 4;
    return stars * 2;
  };

  const fetchMovies = async (reset = false) => {
    // funcion asincrona para obtener peliculas de la api, con opcion para reiniciar la lista
    try {
      const minVoteAverage = getVoteAverageFromRating(rating); // obtiene la calificacion minima basada en el rating seleccionado

      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=false&page=${page}`
        : // si hay un termino de busqueda, usa la api de busqueda
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&vote_average.gte=${minVoteAverage}&vote_count.gte=40&include_adult=false&page=${page}&sort_by=popularity.desc`;
      // si no hay termino de busqueda, usa la api de descubrimiento con filtros por calificacion

      const response = await axios.get(endpoint); // realiza la peticion a la api
      const data = response.data; // guarda la respuesta

      if (data.results.length === 0) {
        setHasMore(false); // si no hay resultados, indica que no hay mas peliculas para cargar
      } else {
        const filteredMovies = data.results.filter(
          (movie) => movie.vote_average >= minVoteAverage
        );
        // filtra las peliculas que tienen una calificacion mayor o igual al minimo requerido

        setMovies((prevMovies) =>
          reset ? filteredMovies : [...prevMovies, ...filteredMovies]
        );
        // si es un reinicio, reemplaza las peliculas, si no, agrega las nuevas peliculas al estado existente
      }
    } catch (error) {
      console.error("Error fetching movies:", error); // maneja errores en la peticion
      setHasMore(false); // si hay un error, detiene la carga de mas peliculas
    }
  };

  useEffect(() => {
    fetchMovies(true);
    // llama a fetchMovies cuando cambian el rating o el termino de busqueda, reinicia la lista de peliculas
  }, [rating, searchTerm]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies();
      // si cambia la pagina, llama a fetchMovies para cargar mas peliculas
    }
  }, [page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      // funcion que aumenta la pagina actual despues de un retraso, para simular carga
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
          // reinicia el estado cuando cambia el termino de busqueda
        }}
      />
      <InfiniteScroll
        dataLength={movies.length}
        // establece la longitud de la lista de peliculas actual
        next={fetchMoreData}
        // funcion que se llama para cargar mas peliculas
        hasMore={hasMore}
        // indica si hay mas peliculas para cargar
        loader={<p>Cargando más películas...</p>}
        // muestra un mensaje de carga mientras se obtienen mas peliculas
        endMessage={<p>No hay más películas para mostrar.</p>}
        // mensaje que se muestra cuando ya no hay mas peliculas para cargar
      >
        <MovieList movies={movies} />
      </InfiniteScroll>
    </div>
  );
}

export default Home;
