import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();

  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantsFinder.get(`/${id}`);

        setSelectedRestaurant(response.data.restaurant[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && <Reviews /> }
    </div>
  );
}

export default RestaurantDetailPage;