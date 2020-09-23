//without Formik

import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import FormField from "./FormField"

const formSchema = yup.object().shape({
  fullName: yup.string().required("Name is a required field")
        .min(2, "Name must be at least 2 characters long.")
        .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    // phone: yup.string().matches(/^\d{10}$/, 'is not valid'),
    address: yup.string().required("Please leave an address."),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.string().required(),
    accountType: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
        .required("Please confirm your password")
        .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    }),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

console.log(formSchema);

const SignUpForm = () => {
    // managing state for our form inputs

    const defaultState ={
      fullName: "",
      email: "",
      // phone: "5083647706",
      address: "",
      city: "",
      state:"",
      zipcode: "",
      accountType: '',
      username: "",
      password: "",
      confirmPassword: "",
      terms: false
    }   

   const [formState, setFormState] = useState(defaultState);
  
    const [errorState, setErrorState] = useState(defaultState);
  
    console.log("Error state", errorState)
  
    // onChange function
    const inputChange = e => {
      e.persist();
      // console.log("input changed!", e.target.value, e.target.checked);
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      console.log('checked', e);
      setFormState({
        ...formState, [e.target.name] : value
      })
      
      
      
      validate(e);
    }
  
  
    const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
  
    const formSubmit = e => {
      e.preventDefault();
      console.log("form submitted!");
 

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
    }, [formState, errorState]);
  

    //form validation
    const validate = e => {
      let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
          setErrorState({...errorState, [e.target.name]: ""});
          console.log('THEN', e.target.name);
        })
        .catch(err => {
          setErrorState({...errorState, [e.target.name]: err.errors[0]});
          console.log('ERROR', err.errors[0]);

        });
    };
  
  
      return (
          <>
<div className="formContainer">
  <form onSubmit={formSubmit}>
  
  <div className="fullName">
  <label htmlFor="fullName">
          <h4>Name</h4>
          <FormField
            placeholder="Full Name"
            type="text"
            name="fullName"
            id="fullName"
            value={formState.fullName}
            onChange={inputChange}
          />
           {errorState.fullName.length > 2 ? (
            <p className="error">{errorState.fullName}</p>
          ) : null}
  </label>
  </div>

  <div className="email">
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
 </div>

  {/* <label htmlFor="phone">Enter your phone number:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input> */}
  <div className="address">
  <label htmlFor="address"><h4>Address</h4>
          {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}
  
          <input type="address" name="address" placeholder="Your Address Here" value={formState.address} onChange={inputChange} />
  </label>
</div>

<div className="city">
  <label htmlFor="city">
          <h4>City</h4>
   </label>        
        <input
            type="text"
            name="city"
            id="city"
            value={formState.city}
            onChange={inputChange}
          />
</div>

<div className="state">
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
</div>

<div className="zipcode">
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
</div>    


      <div className="accountType">
      <h4 id="accountType">Account Type:</h4>
      <label className="accountType" htmlFor="accountType">
          <p>
          <input 
              type="radio"
              name="accountType"
              id="owner"
              value='owner'
              onChange={inputChange}
          />Owner
          </p>
          <p>
          <input 
              type="radio"
              name="accountType"
              id="renter"
              value='renter'
              onChange={inputChange}
          />Renter</p>
      </label>
      </div>

      <div className="username">
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
</div>

<div className="password">
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
</div>

<div className="confirmPassword">
    <label htmlFor="confirmPassword">
          <h4>Confirm Password</h4>
   </label>        
        <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={inputChange}
            errors={errorState}
          />
        {errorState.confirmPassword.length > 0 ? <p>{errorState.confirmPassword}</p> : null}
</div>

<div className="terms">
  <label htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
          
        />
        Terms and Conditions
        {errorState.terms.length > 0 ? (
          <p className="error">{errorState.terms}</p>
        ) : null}
      </label>
  </div>
   
  
  
        <button disabled={buttonDisabled} type="submit">Create Account</button>
      </form>
      </div>
      <pre>{JSON.stringify(postedData, null, 2)}</pre>
      </>
      )
  }
  
  export default SignUpForm;
  
  

