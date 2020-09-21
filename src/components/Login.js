import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import Input from "./Input";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Login(props) {
  let history = useHistory();

  const defaultState = {
    username: "",
    password: "",
  };

  const [errors, setErrors] = useState({ ...defaultState });
  const [login, setLogin] = useState(defaultState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const user = useContext(UserContext);

  let formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(8, "Username must be 8 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters"),
  });

  useEffect(() => {
    if (login.username && login.password) {
      setButtonDisabled(false);
    } else if (!login.username || !login.password) {
      setButtonDisabled(true);
    }
  }, [login]);

  console.log(user);
  const loginSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("auth/login", login, { withCredentials: true })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", "12345");
        props.setLoggedIn(true);
        user.setUserData({
          token: 23,
          user: {
            name: "John Doe",
          },
        });

        history.push("/tech-items");
      })
      .catch((err) => {
        console.log("invalid login", err);
      });
  };

  //onChange function, put validation within function
  const inputChange = (e) => {
    e.persist();
    let value = e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
    //spread accross loginState and set to value of input.
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    console.log(login);
    // validateChange(e);
  };

  return (
    <div className="formContainer">
      <form onSubmit={loginSubmit}>
        <Input
          type="text"
          name="username"
          onChange={inputChange}
          value={login.username}
          label="User Name"
          errors={errors}
        />
        <Input
          type="password"
          name="password"
          onChange={inputChange}
          value={login.password}
          label="Password"
          errors={errors}
        />
        <button disabled={buttonDisabled}>Login</button>
      </form>
    </div>
  );
}

export default Login;
