import React, { useEffect } from "react";
import RentedItems from "./RentedItems";
import { dummyData } from "../../dummyData";
import MyItems from "./MyItems";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

function Dashboard(props) {
  const [myItems, setMyItems] = React.useState();
  useEffect(() => {
    axiosWithAuth()
      .get("api/owner/items")
      .then((res) => setMyItems(res.data));
  }, []);

  const itemsAvailable = myItems?.filter(
    (item) => item.owner_id === props.location.state && item.available === false
  );

  return (
    <div>
      <div className="centerWrapper ">
        <div className="dashboard-title">
          <h2>Dashboard</h2>
        </div>
        <div className="dashboard">
          <div className="dashboard-items">
            {myItems?.map((item) => (
              <MyItems key={item.id} data={item} />
            ))}
          </div>
          <div className="dashboard-sidebar">
            <h2>Rented Items</h2>
            {itemsAvailable?.map((item) => (
              <RentedItems key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
