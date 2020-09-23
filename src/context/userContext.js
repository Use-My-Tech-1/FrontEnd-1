import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    token: "",
    message: "",
    error: "",
    user: {},
    data: [],
    owner: false,
    userId: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};
