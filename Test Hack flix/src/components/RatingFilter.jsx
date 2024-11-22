import React from "react";
import ReactStars from "react-rating-stars-component";

function RatingFilter({ rating, onRatingChange }) {
  return (
    <div className="rating-filter">
      <h2>Filtrar por rating:</h2>
      <div className="stars-container">
        <ReactStars
          count={5}
          value={rating}
          onChange={onRatingChange}
          size={24}
          activeColor="#ffd700"
        />
        <span>& Más</span>
      </div>
    </div>
  );
}

export default RatingFilter;
