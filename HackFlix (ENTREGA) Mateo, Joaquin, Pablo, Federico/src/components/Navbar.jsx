import { Link } from "react-router-dom";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ReactStars from "react-rating-stars-component";
import Button from "react-bootstrap/Button";

function CustomNavbar({ rating, onRatingChange, onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand className="navbar-brand">
        ¡Tus Películas Favoritas!
      </Navbar.Brand>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Buscar películas..."
          className="form-control"
          onChange={handleSearch}
        />
      </Form>
      <div className="rating-filter">
        <ReactStars
          count={5}
          value={rating}
          onChange={onRatingChange}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <Link to="/recomendaciones" className="btn btn-link">
        Recomendaciones
      </Link>
    </Navbar>
  );
}

export default CustomNavbar;
