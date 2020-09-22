import React, { useContext, useEffect } from "react";
import Item from "./Item";
import { UserContext } from "../context/userContext";
import Api from "../utils/api";

function ItemGallery() {
  const { userData, setUserData } = useContext(UserContext);

  const Welcome = userData.message ? userData.message : "Welcome";

  const getItems = async () => {
    try {
      const response = await Api().get("/items");

      setUserData({
        ...userData,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="centerWrapper">
        <h1 className="welcome--name">{Welcome}</h1>
        <div className="rental-items">
          {userData.data?.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemGallery;
