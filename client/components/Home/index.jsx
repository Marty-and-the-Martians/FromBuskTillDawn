/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';

const Home = () => {
  const { eventFetch, myCalendar, currentUser } = useContext(AppContext);
  return (
    <div>
      <MapViewer />
      <button onClick={eventFetch}> Local Events </button>
      {currentUser.id
        ? <button onClick={myCalendar}> My Schedule </button>
        : null}
      <CalViews />
    </div>
  );
};

export default Home;
