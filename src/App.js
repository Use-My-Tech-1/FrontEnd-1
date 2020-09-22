import React, {useState} from 'react'
import Header from './components/Header'
import Login from './components/Login'
import {Route, Switch} from 'react-router-dom'
import ItemGallery from './pages/ItemGallery'
import SignUpForm from './components/SignUpForm'
import ItemCard from './pages/ItemCard'
import Error404 from './pages/Error404'
import PrivateRoute from './routes/PrivateRoute'
import CreateTechItem from './components/CreateTechItem'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className='container'>
      <Header />
      <div className='mainbody'>
        <Switch>
          <Route path='/signup' component={SignUpForm} />
          <Route path='/item/:id'>
            <ItemCard />
          </Route>
          <Route path='/login'>
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <PrivateRoute exact path='/' component={ItemGallery} />
          <Route path='/add-tech-item'>
            <CreateTechItem/>
          </Route>
          <Route exact path='*' component={Error404} />
        </Switch>
      </div>
    </div>
  )
}

export default App
