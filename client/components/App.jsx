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
import PerformerProfile from './PerformerProfile';

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
  const [eventFetchDate, setEventFetchDate] = useState(new Date().toString());
  const [addEventPopupOpen, setAddEventPopupOpen] = useState(false);
  const [currentPerformerProfile, setcurrentPerformerProfile] = useState('');

  const eventFetch = () => {
    axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}&date=${eventFetchDate}`)
      .then((results) => { setEvents(results.data); });
  };

  const fetchSessionInfo = () => {
    if (window.sessionStorage.token) {
      const tokens = (window.sessionStorage.token).split('.');
      setLoggedIn(true);
      setCurrentUser(JSON.parse(atob(tokens[1])));
    }
  };

  const myCalendar = () => {
    axios.get(`/api/event/${currentUser.id}?lng=${center.lng}&lat=${center.lat}`)
      .then((results) => { const cleaned = (cleanMyCal(results.data))[0]; setEvents(cleaned); });
  };

  useEffect(eventFetch, []);
  useEffect(eventFetch, [center, eventFetchDate]);
  useEffect(fetchSessionInfo, []);
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
      setCurrentUser,
      setCenter,
      setEventFetchDate,
      setcurrentPerformerProfile,
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
      eventFetchDate,
      currentPerformerProfile,
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
          <Route exact path="/performer">
            <PerformerProfile />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};
export default App;
