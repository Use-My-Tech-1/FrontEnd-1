import React, { useContext } from "react";
import Item from "./Item";
import { dummyData } from "../dummyData";
import { UserContext } from "../context/userContext";

function ItemGallery() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      <div className="centerWrapper">
        <h1 className="welcome--name">Welcome {userData.user.name}</h1>
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
