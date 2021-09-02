import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
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
  const [center, setCenter] = useState({
    lat: 39.7392,
    lng: -104.9903,
  });
  const [currentUser, setCurrentUser] = useState({});
  const userNameClick = (e) => {
    console.log(e);
  };
  const [events, setEvents] = useState([]);
  const [newEventLoc, setNewEventLoc] = useState({
    lat: null,
    lng: null,
  });
  const [selected, setSelected] = useState(null);
  const [addEventPopupOpen, setAddEventPopupOpen] = useState(false);

  useEffect(() => {
    axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: new Date().toString() })
      .then((results) => { setEvents(results.data); });
  }, []);

  useEffect(() => {
    axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: new Date().toString() })
      .then((results) => { setEvents(results.data); });
  }, [center]);

  return (
    <>
      <AppContext.Provider value={{
        setLoggedIn,
        setAccountDeetsShowing,
        setBtnPath,
        setBtnText,
        setEvents,
        setNewEventLoc,
        setSelected,
        setAddEventPopupOpen,
        userNameClick,
        setCurrentUser,
        loggedIn,
        accountDeetsShowing,
        btnPath,
        btnText,
        events,
        newEventLoc,
        selected,
        setSelected,
        center,
        setCenter,
        addEventPopupOpen,
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
