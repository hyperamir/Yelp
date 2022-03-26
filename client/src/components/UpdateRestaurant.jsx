import React from "react";
import { useParams } from "react-router-dom";

const UpdateRestaurant = (props) => {
  const test = useParams();
  console.log(test);

  return(
    <div>
      <div className="col">
        <input  className="form-control" type='text' placeholder="name" />
      </div>
      <div className="col">
        <input  className="form-control" type='text' placeholder="location" />
      </div>
      <div className="col">
        <select className="custom-select my-1 mr-sm-2">
          <option disabled>Price Range</option>
          <option value='1'>$</option>
          <option value='2'>$$</option>
          <option value='3'>$$$</option>
          <option value='4'>$$$$</option>
          <option value='5'>$$$$$</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  );
}

export default UpdateRestaurant;