import React from "react";
import RentedItems from "./RentedItems";
import { dummyData } from "../../dummyData";
import MyItems from "./MyItems";

function Dashboard(props) {
  const filterItems = dummyData.filter(
    (item) => item.owner_id === props.location.state
  );

  const itemsAvailable = dummyData.filter(
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
            {filterItems.map((item) => (
              <MyItems key={item.id} data={item} />
            ))}
          </div>
          <div className="dashboard-sidebar">
            <h2>Rented Items</h2>
            {itemsAvailable.map((item) => (
              <RentedItems key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
