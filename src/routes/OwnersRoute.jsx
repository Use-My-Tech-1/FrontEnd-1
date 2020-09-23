import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

const OwnersRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem("token");
  const { userData } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken && userData.owner ? <h1>onwers</h1> : <Redirect to="/login" />
      }
    />
  );
};

export default OwnersRoute;
