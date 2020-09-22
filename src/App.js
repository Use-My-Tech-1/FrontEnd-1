import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import ItemGallery from "./pages/ItemGallery";
import SignUpForm from "./components/SignUpForm";
import ItemCard from "./pages/ItemCard";
import Error404 from "./pages/Error404";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="mainbody">
        <Switch>
          <Route path="/signup" component={SignUpForm} />
          <PrivateRoute path="/item/:id" component={ItemCard} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={ItemGallery} />
          <Route exact path="*" component={Error404} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
