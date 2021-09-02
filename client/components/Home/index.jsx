import React, { useContext } from 'react';
import AppContext from '../../context';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';

const Home = () => {
  const { eventFetch, myCalendar, currentUser, eventFetchDate, setEventFetchDate } = useContext(AppContext);
  return (
    <div>
      <MapViewer />
      <input type="date" value={new Date(eventFetchDate).toISOString().slice(0, 10)} onChange={(event) => { setEventFetchDate(new Date(new Date(event.target.value).getTime() + (6 * 60 * 60 * 1001)).toString()); }} />
      <button> Local Events </button>
      {currentUser.id
        ? <button> My Schedule </button>
        : null}
      <CalViews />
    </div>
  );
};

export default Home;
