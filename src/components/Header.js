import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Header() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({
      ...userData,
      message: "",
      token: "",
      owner: "",
      userId: "",
    });
    history.push("/");
  };

  const logoutBtn = userData.token ? (
    <button onClick={handleLogout}>Logout</button>
  ) : null;
  return (
    <nav>
      <h1 className="pageHeader">Rent My Tech</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Register</Link>
        {/* <Link to="/tech-items">Tech2Rent</Link> */}
        <Link to="/add-tech-item">Add-Tech-Item</Link>
        {logoutBtn}
      </div>
    </nav>
  );
}

export default Header;
