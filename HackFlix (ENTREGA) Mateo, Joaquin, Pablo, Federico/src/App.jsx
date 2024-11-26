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
        <Route path="/" element={<Home />} /> {}
        <Route path="/pelicula/:id" element={<MovieDetails />} /> {}
        <Route path="/recomendaciones" element={<Recommendations />} />
        <Route path="*" element={<NotFound />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
