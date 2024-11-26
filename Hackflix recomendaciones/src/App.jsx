import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";
import Recommendations from "./components/Recommendations";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página principal */}
        <Route path="/pelicula/:id" element={<MovieDetails />} />{" "}
        {/* Detalles */}
        <Route path="/recomendaciones" element={<Recommendations />} />
        <Route path="*" element={<NotFound />} /> {/* Error 404 */}
      </Routes>
    </Router>
  );
}

export default App;
