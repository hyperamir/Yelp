import React from "react";
import StarRating from "./StarRating";

const Reviews = props => {
  return (
    <div className="row row-cols-3 mb-2">
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: '30%' }}>
        <div className="card-header d-flex justify-content-between">
          <span>Emily</span>
          <span> <StarRating rating={3.6} /> </span>
        </div>
        <div className="card-body">
          <p className="card-text">Great restaurant!!</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;