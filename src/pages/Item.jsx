import React from "react";
import { GoLocation } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";

function Item({ data }) {
  return (
    <>
      <div className="item">
        <div className="product">
          <img src={data.imageUrl} alt="" className="item--product-image" />
          <div className="item-location-info">
            <GoLocation className="item-location-icon" />
            <h2 className="item-location">{`${data.city}, ${data.state}`}</h2>
          </div>
        </div>
        <div className="item-infomation">
          <div className="item-price">
            <span className="item-dollar-icon">
              <FaDollarSign />
            </span>
            {data.price}
            <span className="rental-term">/Month</span>
          </div>
          <p>{data.description}</p>
          <div className="items-buttons">
            <button className="item-rent-btn">
              <Link to={`/item/${data.id}`}>Rent Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
