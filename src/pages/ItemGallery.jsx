import React from "react";
import Item from "./Item";
import { dummyData } from "../dummyData";
function ItemGallery() {
  return (
    <>
      <div className="centerWrapper">
        <h1>Gallery</h1>
        <div className="rental-items">
          {dummyData.map((item) => (
            <Item data={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemGallery;
