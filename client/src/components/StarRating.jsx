import React from "react";

const StarRating = ({ rating }) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i className="fa-solid fa-star"></i>);
    } else if (!Number.isInteger(rating) && Math.ceil(rating) === i) {
      stars.push(<i className="fa-solid fa-star-half-stroke"></i>);
    }
    else {
      stars.push(<i className="fa-regular fa-star"></i>);
    }
  }

  return (
    <>
      {stars}
    </>
  );
}

export default StarRating;