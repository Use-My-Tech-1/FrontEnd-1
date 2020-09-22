import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import FormField from "./FormField"

//setting the initial values
const initialValues = {
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
};

//creating the validation schema
const formSchema = yup.object().shape({
  fullName: yup
        .string()
        .required("Name is a required field")
        .min(3, "Name must be at least 3 characters")
        .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    // phone: yup.string().matches(/^\d{10}$/, 'is not valid'),
    address: yup
        .string()
        .required("Please leave an address."),
    city: yup
        .string()
        .required(),
    state: yup
        .string()
        .required(),
    zipcode: yup
        .string()
        .required(),
    accountType: yup
        .string()
        .required(),
    username: yup
        .string()
        .required(),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    }),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

function SignUpForm({ onSubmit }) {
  //using useFormik
  const formik = useFormik({
    initialValues,
    formSchema,
    onSubmit
  });

  //use formik.getFieldProps for input fields
  const nameProps = formik.getFieldProps("name");
  const emailProps = formik.getFieldProps("email");const ageProps = formik.getFieldProps("age");
  const passwordProps = formik.getFieldProps("password");
  const confirmPasswordProps = formik.getFieldProps("confirmPassword");

  /**
   * getFieldProps is a way to reduce boilerplate (repetitive) code.
   * It returns helper methods like `onChange`, `onBlur`, `value`, `name`.
   *
   * @see Formik https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
   */
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        label="Name"
        placeholder="Full Name"
        type="text"
        name="fullName"
        id="fullName"
        {...nameProps}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <FormField
        label="Email"
        placeholder="Please enter your email"
        type="email"
        name="email"
        id="email"
        {...emailProps}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}



      <FormField
        label="Age"
        type="number"
        {...ageProps}
        placeholder="Please Enter your age"
      />
      {formik.touched.age && formik.errors.age ? (
        <div>{formik.errors.age}</div>
      ) : null}
      

      <FormField
        label="Password"
        placeholder="Please Enter your password"
        type="password"
        name="password"
        id="password"
        {...passwordProps}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <FormField
        label="Confirm Password"
        placeholder="Please Confirm your password"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        {...confirmPasswordProps}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}
      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
    </form>
  );
}

export default SignUpForm;






// console.log(formSchema);


// const SignUpForm = () => {
//     // managing state for our form inputs

//     const defaultState ={
//       fullName: "",
//       email: "",
//       // phone: "5083647706",
//       address: "",
//       city: "",
//       state:"",
//       zipcode: "",
//       accountType: '',
//       username: "",
//       password: "",
//       confirmPassword: "",
//       terms: false
//     }   

//    const [formState, setFormState] = useState(defaultState);
  
//     const [errorState, setErrorState] = useState(defaultState);
  
//     console.log("Error state", errorState)
  
//     // onChange function
//     const inputChange = e => {
//       e.persist();
//       // console.log("input changed!", e.target.value, e.target.checked);
//       const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//       console.log('checked', e);
//       setFormState({
//         ...formState, [e.target.name] : value
//       })
      
      
      
//       validate(e);
//     }
  
  
//     const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
  
//     // const formSubmit = e => {
//     //   e.preventDefault();
//     //   console.log("form submitted!");
 

//     //   axios
//     //     .post("https://reqres.in/api/users", formState)
//     //     .then((response) => {
//     //       setPostedData(response.data);
  
//     //   })
//     //     .catch(err => console.log(err));
  
//     // };
  
//     // BONUS!: state for whether our button should be disabled or not.
//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     // Everytime formState changes, check to see if it passes verification.
//     // If it does, then enable the submit button, otherwise disable
//     useEffect(() => {
//       formSchema.isValid(formState).then(valid => {
//         setButtonDisabled(!valid);
//       });
//     }, [formState, errorState]);
  

//     //form validation
//     const validate = e => {
//       let value =
//         e.target.type === "checkbox" ? e.target.checked : e.target.value;

//       yup
//         .reach(formSchema, e.target.name)
//         .validate(value)
//         .then(valid => {
//           setErrorState({...errorState, [e.target.name]: ""});
//           console.log('THEN', e.target.name);
//         })
//         .catch(err => {
//           setErrorState({...errorState, [e.target.name]: err.errors[0]});
//           console.log('ERROR', err.errors[0]);

//         });
//     };

//     function SignUpForm({ onSubmit }) {
//       //using useFormik 
//       const formik = useFormik({
//         defaultState,
//         formSchema,
//         onSubmit
//       });
  
  
//       return (
//           <>
// <div className="formContainer">
//   <form onSubmit={formik.handleSubmit}>
  
//   <div className="fullName">
//           <FormField
//             label="Name"
//             placeholder="Full Name"
//             type="text"
//             name="fullName"
//             id="fullName"
//             value={formState.fullName}
//             onChange={inputChange}
//           />
//            {errorState.fullName.length > 2 ? (
//             <p className="error">{errorState.fullName}</p>
//           ) : null}

//   </div>

//   <div className="email">
//         <FormField
//             label="Email"
//             placeholder="Please enter your email"
//             type="email"
//             name="email"
//             id="email"
//             value={formState.email}
//             onChange={inputChange}
//           />
//           {errorState.email.length > 0 ? (
//             <p className="error">{errorState.email}</p>
//           ) : null}
//  </div>

//   {/* <label htmlFor="phone">Enter your phone number:</label>
// <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input> */}
//   <div className="address">
//           <FormField
//               label="Adress" 
//               type="address" 
//               name="address" 
//               placeholder="Your Address Here" 
//               value={formState.address} 
//               onChange={inputChange} />

//   {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}
// </div>

// <div className="city">      
//         <FormField
//             label="City"
//             type="text"
//             name="city"
//             id="city"
//             value={formState.city}
//             onChange={inputChange}
//           />
// </div>

// <div className="state">       
//         <FormField
//             label="State"
//             type="state"
//             name="state"
//             id="state"
//             value={formState.state}
//             onChange={inputChange}
//           />
// </div>

// <div className="zipcode">     
//         <FormField
//             label="Zip Code"
//             type="zipcode"
//             name="zipcode"
//             id="zipcode"
//             value={formState.zipcode}
//             onChange={inputChange}
//           />
// </div>    


//       <div className="accountType">
//       <h4 id="accountType">Account Type:</h4>
//       <label className="accountType" htmlFor="accountType">
//           <p>
//           <input 
//               type="radio"
//               name="accountType"
//               id="owner"
//               value='owner'
//               onChange={inputChange}
//           />Owner
//           </p>
//           <p>
//           <input 
//               type="radio"
//               name="accountType"
//               id="renter"
//               value='renter'
//               onChange={inputChange}
//           />Renter</p>
//       </label>
//       </div>

//       <div className="username">      
//         <FormField
//             label="Username"
//             type="username"
//             name="username"
//             id="username"
//             value={formState.username}
//             onChange={inputChange}
//           />
// </div>

// <div className="password">       
//         <FormField
//             label="Password"
//             placeholder="Please Enter your password"
//             type="password"
//             name="password"
//             id="password"
//             value={formState.password}
//             onChange={inputChange}
//           />
// </div>

// <div className="confirmPassword">       
//         <FormField
//             label="Confirm Password"
//             placeholder="Please Confirm your password"
//             type="password"
//             name="confirmPassword"
//             id="confirmPassword"
//             value={formState.confirmPassword}
//             onChange={inputChange}
//             errors={errorState}
//           />
//         {errorState.confirmPassword.length > 0 ? <p>{errorState.confirmPassword}</p> : null}
// </div>

// <div className="terms">
//   <label htmlFor="terms">
//         <input
//           type="checkbox"
//           id="terms"
//           name="terms"
//           checked={formState.terms}
//           onChange={inputChange}
          
//         />
//         Terms and Conditions
//         {errorState.terms.length > 0 ? (
//           <p className="error">{errorState.terms}</p>
//         ) : null}
//       </label>
//   </div>
   
  
  
//         <button disabled={buttonDisabled} type="submit">Create Account</button>
//       </form>
//       </div>
//       <pre>{JSON.stringify(postedData, null, 2)}</pre>
//       </>
//       )
//   }
  
//   export default SignUpForm;
  
  

