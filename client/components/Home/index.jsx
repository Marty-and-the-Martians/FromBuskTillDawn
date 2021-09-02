import React, { useContext } from 'react';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';
import AppContext from '../../context';

const Home = () => {
  const { eventFetch, myCalendar } = useContext(AppContext);
  return (
    <div>
      <MapViewer />
      <button onClick={eventFetch}> Local Events </button>
      <button onClick={myCalendar}> My Schedule </button>
      <CalViews />
    </div>
  );
};

export default Home;
