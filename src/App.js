import React, {useState} from 'react';
import Header from './components/Header';
import Login from './components/Login';
import { Route, Switch } from 'react-router-dom';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container">
        <Header />
      <div className='mainbody'>
          <Switch>
            <Route path='/login'>
              <Login setLoggedIn={setLoggedIn}/>
           </Route>
          </Switch>
      </div>
    </div>
  );
}

export default App;
