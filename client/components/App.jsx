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
import cleanMyCal from '../helperFuncs/cleanMyCal';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountDeetsShowing, setAccountDeetsShowing] = useState(false);
  const [btnText, setBtnText] = useState('Login');
  const [btnPath, setBtnPath] = useState('/');
  const [center, setCenter] = useState({
    lat: 39.7392,
    lng: -104.9903,
  });
  const [currentUser, setCurrentUser] = useState({});
  const [events, setEvents] = useState([]);
  const [newEventLoc, setNewEventLoc] = useState({
    lat: null,
    lng: null,
  });
  const [selected, setSelected] = useState(null);
  const [addEventPopupOpen, setAddEventPopupOpen] = useState(false);
  const eventFetch = () => {
    axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: new Date().toString() })
      .then((results) => { console.log('proximity: ', results.data); setEvents(results.data); });
  };

  const myCalendar = () => {
    // console.log(currentUser.id, ': ', center.lng, ': ', center.lat);
    axios.get(`/api/event/${currentUser.id}?lng=${center.lng}&lat=${center.lat}`)
      .then((results) => console.log('mySchedule: ', results.data,
        // cleanMyCal(results.data)
      ));
  };

  const userNameClick = (e) => {
    console.log(e);
  };

  useEffect(eventFetch, []);

  useEffect(eventFetch, [center]);

  return (
    <AppContext.Provider value={{
      eventFetch,
      myCalendar,
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
      setCenter,
      currentUser,
      loggedIn,
      accountDeetsShowing,
      btnPath,
      btnText,
      events,
      newEventLoc,
      selected,
      center,
      addEventPopupOpen,
    }}
    >
      <Router>
        <NavBar />

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/account">
            <AccountDetails />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
