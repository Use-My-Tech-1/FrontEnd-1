import React from "react";
import { Link } from "react-router-dom";

function MyItems({ data }) {
  return (
    <div className="myitems">
      <Link
        className="myitems"
        to={{
          pathname: "/dashboard/edit",
          state: data,
          search: `?sort=${data.itemName}`,
        }}
      >
        <img className="myItems-avatar-image" src={data.imageUrl} alt="" />
        <h3 className="myiteims-tittle">{data.itemName}</h3>
        <h3 className="myiteims-tittle">${data.price}</h3>
      </Link>
    </div>
  );
}

export default MyItems;
