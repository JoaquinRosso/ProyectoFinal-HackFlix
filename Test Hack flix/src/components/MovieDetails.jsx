import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "1aa87dcd0808ad62f0e129e0c48888b9";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );

        setTimeout(() => {
          setMovie(response.data);
          setLoading(false);
        }, 750);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-screen">
        <p>No se encontraron detalles para esta película.</p>
        <Link to="/" className="back-button">
          Volver a la página principal
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <Link to="/" className="back-button">
        Volver a la página principal
      </Link>
    </div>
  );
}

export default MovieDetails;
