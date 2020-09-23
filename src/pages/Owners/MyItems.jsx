import React from "react";
import { Link } from "react-router-dom";

function MyItems({ data }) {
  return (
    <div>
      <Link
        className="myitems"
        to={{
          pathname: "/dashboard/edit",
          state: data,
          search: `?sort=${data.itemName}`,
        }}
      >
        <img className="myItems-avatar-image" src={data.imageUrl} alt="" />
        <div>
          <h3 className="myiteims-tittle">{data.itemName}</h3>

          <h4 className="myiteims-tittle">${data.price}</h4>
        </div>
      </Link>
    </div>
  );
}

export default MyItems;
