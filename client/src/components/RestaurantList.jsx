import React, { useEffect } from "react";
import { useContext } from "react";
import RestaurantsFinder from "../api/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";


const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)

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
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;