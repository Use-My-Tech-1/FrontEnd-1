import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Anime, {anime} from 'react-anime';
import FormField from './FormField'

const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Name is a required field')
    .min(2, 'Name must be at least 2 characters long.')
    .matches(/[a-zA-z][a-zA-Z]{2,}/, 'Name must be letters only.'),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Must include email address'),
  // phone: yup.string().matches(/^\d{10}$/, 'is not valid'),
  address: yup.string().required('Please leave an address.'),
  city: yup.string().required(),
  state: yup.string().required(),
  // zipcode: yup.string().required(),
  owner: yup.boolean().required(),
  username: yup.string().required(),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  terms: yup.boolean().oneOf([true], 'Please agree to terms of use'),
})

const SignUpForm = () => {
  // managing state for our form inputs

  let history = useHistory()

  const defaultState = {
    fullName: '',
    email: '',
    // phone: "5083647706",
    address: '',
    city: '',
    state: '',
    // zipcode: "",
    owner: false,
    username: '',
    password: '',
    confirmPassword: '',
    terms: false,
  }

  const [formState, setFormState] = useState(defaultState)
  const [errorState, setErrorState] = useState(defaultState)

  // onChange function
  const inputChange = (e) => {
    e.persist()
    // console.log("input changed!", e.target.value, e.target.checked);
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    // console.log('checked', e);
    setFormState({
      ...formState,
      [e.target.name]: value,
    })

    validate(e)
  }

  const formSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted!')
    axios
      .post('https://use-tech.herokuapp.com/api/auth/register', formState)
      .then((response) => {
        history.push('/login')
      })
      .catch((err) => console.log(err))
  }

  // BONUS!: state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // Everytime formState changes, check to see if it passes verification.
  // If it does, then enable the submit button, otherwise disable
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid)
    })
  }, [formState, errorState])

  //form validation
  const validate = (e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({...errorState, [e.target.name]: ''})
        // console.log('THEN', e.target.name);
      })
      .catch((err) => {
        setErrorState({...errorState, [e.target.name]: err.errors[0]})
        // console.log('ERROR', err.errors[0]);
      })
  }


  return (
    <>
<Anime opacity={[0, 1]} translateY={'1em'} delay={(e, i) => i * 1000}>
  <h1 className="signup-title">Register with us!</h1>
</Anime>
      <div className='signupform'>
      
        <form onSubmit={formSubmit}>

            <FormField
              label='Name'
              placeholder='Full Name'
              type='text'
              name='fullName'
              id='fullName'
              value={formState.fullName}
              onChange={inputChange}
            />
            {errorState.fullName.length > 2 ? (
              <p className='error'>{errorState.fullName}</p>
            ) : null}


          <FormField
            label="Email"
            placeholder='youremail@email.com'
            type='email'
            name='email'
            id='email'
            value={formState.email}
            onChange={inputChange}
          />
          {errorState.email.length > 0 ? (
            <p className='error'>{errorState.email}</p>
          ) : null}

          {/* <label htmlFor="phone">Enter your phone number:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input> */}

          
            

            <FormField
              label="Address"
              type='address'
              name='address'
              placeholder='Your Address Here'
              value={formState.address}
              onChange={inputChange}
            />
          {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}

          <FormField
            label='City'
            type='text'
            name='city'
            id='city'
            value={formState.city}
            onChange={inputChange}
          />


          <FormField
            label="State"
            type='state'
            name='state'
            id='state'
            value={formState.state}
            onChange={inputChange}
          />

          {/* <label htmlFor="zipcode">
  //         <h4>Zip Code</h4>
  //  </label>        
  //       <input
  //           type="zipcode"
  //           name="zipcode"
  //           id="zipcode"
  //           value={formState.zipcode}
  //           onChange={inputChange}
  //         /> */}


            {/* <h4 id="accountType">Account Type:</h4> */}
            <label className='accountType' htmlFor='accountType'>
              <input
                
                type='checkbox'
                name='owner'
                id='owner'
                value='true'
                onChange={inputChange}
              />
              
              <p>  Owner 
                <br/>
                 <span className="p-span">*Check only if you want to list items</span>
              </p>
              {/* <p> */}
              {/* <input 
              type="radio"
              name="accountType"
              id="renter"
              value='false'
              onChange={inputChange}
          />Renter</p> */}
            </label>

          <FormField
            label='Username'
            type='username'
            name='username'
            id='username'
            value={formState.username}
            onChange={inputChange}
          />

          <FormField
            label='Password'
            type='password'
            name='password'
            id='password'
            value={formState.password}
            onChange={inputChange}
          />

          <FormField
            label="Confirm Password"
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={formState.confirmPassword}
            onChange={inputChange}
          />
        {/* {errorState.confirmPassword.length > 0 ? <p>{errorState.confirmPassword}</p> : null} */}

          <label htmlFor='terms' className="terms">
            <input
              label='Terms and Conditions'
              type='checkbox'
              id='terms'
              name='terms'
              checked={formState.terms}
              onChange={inputChange}
            />
            Terms and Conditions
            {errorState.terms.length > 0 ? (
              <p className='error'>{errorState.terms}</p>
            ) : null}
          </label>

          <button disabled={buttonDisabled} type='submit'>
            Create Account
          </button>
        </form>
      </div>
 
      {/* <pre>{JSON.stringify(postedData, null, 2)}</pre> */}
    </>
  )
}

export default SignUpForm
