import React, { useEffect } from "react";
import { useContext } from "react";
import RestaurantsFinder from "../api/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from 'react-router-dom';
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantsFinder.get('/');
        setRestaurants(response.data.data.restaurants)

      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`restaurants/${id}/update`)
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const removeRest = await RestaurantsFinder.delete(`/${id}`)
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  }

  const renderRating = restaurant => {
    return (
      !restaurant.count ? 
      <span className="text-warning">0 reviews</span>
      :
      <>
       <StarRating rating={restaurant.average_rating}/>
       <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map(restaurant => {
            return (
              <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td><button className="btn btn-warning" onClick={(e) => handleUpdate(e, restaurant.id)}>Update</button></td>
                <td><button className="btn btn-danger" type="submit" onClick={(e) => handleDelete(e, restaurant.id)} >Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;