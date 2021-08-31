import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import AppContext from '../context';
import MapViewer from './MapViewer';
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
          {/* <Link to="/">Home</Link>
          <Link to="/signin">Sign in or Sign up</Link>
          <Link to="/account">My Account</Link> */}
          <NavBar />

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/account">
              <AccountDetails />
            </Route>
          </Switch>
        </Router>
        <MapViewer />
      </AppContext.Provider>
    </>
  );
};

export default App;


{ /* isMarkerShown */ }
{ /* googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`} */ }
{ /* loadingElement={<div style={{ height: `100%` }} />} */ }
{ /* containerElement={<div style={{ height: `400px` }} />} */ }
{ /* mapElement={<div style={{ height: `100%` }} />} */ }
