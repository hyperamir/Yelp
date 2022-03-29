import React from "react";

const StarRating = ({ rating }) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>);
    } else if (!Number.isInteger(rating) && Math.ceil(rating) === i) {
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>);
    }
    else {
      stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>);
    }
  }

  return (
    <>
      {stars}
    </>
  );
}

export default StarRating;