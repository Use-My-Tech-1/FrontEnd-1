import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);
  console.log(auth);
  //  Fake Authentication *** TO BE REMOVED LATER
  const isAuthenticated = true;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
