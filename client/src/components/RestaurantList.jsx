import React, { useEffect } from "react";
import RestaurantsFinder from "../api/RestaurantsFinder";

const RestaurantList = () => {

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantsFinder.get('/');
      console.log('response:', response)
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
          <tr>
            <td>Mcdonalds</td>
            <td>toronto</td>
            <td>$$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Update</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;