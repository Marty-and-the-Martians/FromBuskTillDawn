import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import AppContext from '../context';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import AccountDetails from './AccountDetails';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountDeetsShowing, setAccountDeetsShowing] = useState(false);
  const [btnText, setBtnText] = useState('Sign in or Sign up');
  const [btnPath, setBtnPath] = useState('/');

  return (
    <>
      <AppContext.Provider value={{
        setLoggedIn,
        setAccountDeetsShowing,
        loggedIn,
        accountDeetsShowing,
        btnPath,
        setBtnPath,
        btnText,
        setBtnText,
      }}
      >
        <div>
          <h1>From Busk 'till Dawn starter!</h1>
        </div>
        <Router>
          <NavBar />

          <hr />

          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/account">
              <AccountDetails />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </>
  );
};

export default App;
