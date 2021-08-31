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
  const [btnPath, setBtnPath] = useState('/signin');
  const [events, setEvents] = useState([]);
  const [newEventLoc, setNewEventLoc] = useState({
    lat: null,
    lng: null,
  });
  const [selected, setSelected] = useState(null);
  const [addEventPopupOpen, setAddEventPopupOpen] = useState(false);

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
        events,
        setEvents,
        newEventLoc,
        setNewEventLoc,
        selected,
        setSelected,
        addEventPopupOpen,
        setAddEventPopupOpen,
      }}
      >
        <div>
          <h1>From Busk 'till Dawn starter!</h1>
        </div>
        <Router>
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
      </AppContext.Provider>
    </>
  );
};

export default App;
