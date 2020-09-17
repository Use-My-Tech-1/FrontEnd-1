import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field")
        .min(2, "Name must be at least 2 characters long.")
        .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    phone: yup.string(),
    address: yup.string().required("Please leave an address."),
    size: yup.string().required("Must pick your pizza size"),
    city: yup.string(),
    state: yup.string(),
    zipcode: yup.string(),
    acountType: yup.string(),
    username: yup.string(),
    password: yup.string(),
    confirmPassword: yup.string(),
});

const SignUpForm = () => {
    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state:"",
      zipcode: "",
      acountType: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  
    
  
    const [errorState, setErrorState] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state:"",
      zipcode: "",
      acountType: "",
      username: "",
      password: "",
      confirmPassword: "",

    });
  
    console.log("Error state", errorState)
  
    // onChange function
    const inputChange = e => {
      e.persist();
      // console.log("input changed!", e.target.value, e.target.checked);
      validate(e);
      let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormState({ ...formState, [e.target.name]: value });
      console.log(formState)
    };
  
  
    const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
  
    const formSubmit = e => {
      e.preventDefault();
      console.log("form submitted!");
      setFormState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state:"",
        zipcode: "",
        acountType: "",
        username: "",
        password: "",
        confirmPassword: "",
          });

      axios
        .post("https://reqres.in/api/users", formState)
        .then((response) => {
          setPostedData(response.data);
  
      })
        .catch(err => console.log(err));
  
    };
  
    // BONUS!: state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);
    // Everytime formState changes, check to see if it passes verification.
    // If it does, then enable the submit button, otherwise disable
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);
  
    //form validation
    const validate = e => {
      let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
          setErrorState({...errorState, [e.target.name]: ""});
        })
        .catch(err => {
          setErrorState({...errorState, [e.target.name]: err.errors[0]});
          console.log('no erro');
          if (!errorState) {
              setButtonDisabled(false)
          }
        });
    };
  
  
      return (
          <>
<div className="formContainer">
  <form onSubmit={formSubmit}>
  
  <label htmlFor="name">
          <h4>Name</h4>
          <input
            placeholder="Full Name"
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={inputChange}
          />
           {errorState.name.length > 2 ? (
            <p className="error">{errorState.name}</p>
          ) : null}
  </label>
  <label htmlFor="email">
          <h4>Email</h4>
   </label>        
        <input
            placeholder="youremail@email.com"
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={inputChange}
          />
          {errorState.email.length > 0 ? (
            <p className="error">{errorState.email}</p>
          ) : null}
 

  <label htmlFor="phone">Enter your phone number:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
  
  <label htmlFor="address"><h4>Address</h4>
          {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}
  
          <textarea name="address" placeholder="Your Address Here" value={formState.address} onChange={inputChange} />
  </label>

  <label htmlFor="city">
          <h4>City</h4>
   </label>        
        <input
            type="city"
            name="city"
            id="city"
            value={formState.city}
            onChange={inputChange}
          />

    <label htmlFor="state">
          <h4>State</h4>
   </label>        
        <input
            type="state"
            name="state"
            id="state"
            value={formState.state}
            onChange={inputChange}
          />

    <label htmlFor="zipcode">
          <h4>Zip Code</h4>
   </label>        
        <input
            type="zipcode"
            name="zipcode"
            id="zipcode"
            value={formState.zipcode}
            onChange={inputChange}
          />
    


      <div className="sauceCard">
      <h4 id="acountType">Account Type:</h4>
      <label className="acountType" htmlFor="acountType">
          <p>
          <input 
              type="radio"
              name="acountType"
              id="owner"
              value={formState.acountType}
              onChange={inputChange}
          />Owner
          </p>
          <p>
          <input 
              type="radio"
              name="acountType"
              id="renter"
              value={formState.acountType}
              onChange={inputChange}
          />Renter</p>
      </label>
      </div>

    <label htmlFor="username">
          <h4>Username</h4>
    </label>        
        <input
            type="username"
            name="username"
            id="username"
            value={formState.username}
            onChange={inputChange}
          />

    <label htmlFor="password">
          <h4>Password</h4>
   </label>        
        <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={inputChange}
          />

    <label htmlFor="confirmPassword">
          <h4>Confirm Password</h4>
   </label>        
        <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={inputChange}
          />
  
  
   
  
  
        <button disabled={buttonDisabled} type="submit">Create Account</button>
      </form>
      </div>
      <pre>{JSON.stringify(postedData, null, 2)}</pre>
      </>
      )
  }
  
  export default SignUpForm;
  
  