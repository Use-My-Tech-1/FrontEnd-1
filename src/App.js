import React, {useState} from 'react'
import Header from './components/Header'
import Login from './components/Login'
import {Route, Switch} from 'react-router-dom'
import ItemGallery from './pages/ItemGallery'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
<<<<<<< HEAD
    <div className="container">
        <Header />
      <div className='mainbody'>
          <Switch>
            <Route path='/login'>
              <Login setLoggedIn={setLoggedIn}/>
           </Route>
          </Switch>
=======
    <div className='container'>
      <Header />
      <div className='mainbody'>
        <Switch>
          <Route path='/itemgallery' component={ItemGallery} />
          <Route path='/login'>
            <Login setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
>>>>>>> 4861536dbe26356ceb236cda487ff326534b969e
      </div>
    </div>
  )
}

export default App
