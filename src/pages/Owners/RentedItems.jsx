import React from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

function RentedItems({ data }) {
  console.log("sidebar", data);
  const handleRentedChanges = (e) => {};
  return (
    <div className="rentedItems">
      <img className="rentedAvatar" src={data.imageUrl} alt={data.name} />
      <h3 className="rented-title">{data.itemName}</h3>
      <div>
        <label>Rented</label>
        <input
          type="checkbox"
          name="rented"
          id="rented"
          onChange={handleRentedChanges}
          checked={!data.available}
        />
      </div>
    </div>
  );
}

export default RentedItems;
