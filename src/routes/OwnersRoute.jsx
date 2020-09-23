import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../context/userContext'
import Dashboard from '../pages/Owners/Dashboard'

const OwnersRoute = ({component: Component, ...rest}) => {
  const authToken = localStorage.getItem('token')
  const {userData} = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken && userData.owner ? (
          <Dashboard {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}

export default OwnersRoute
