import React, { useState, useContext } from 'react';
import AppContext from '../../../context';
import CalRow from './CalRow';
import Data from '../../../assets/mockData';

const CalViews = () => {
  const { loggedIn, events } = useContext(AppContext);
  const [currentCal, setCurrentCal] = useState('nearest');
  const { user } = Data;
  console.log(events);
  return (
    <>
      <input type="text" placeholder="Search" />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div> Busker </div>
        <div> Genre </div>
        <div> Date </div>
        <div> Time </div>
        <div> Distance </div>
      </div>
      {events.map((event) => (
        <CalRow event={event} key={event._id} />
      ))}
    </>
  );
};
export default CalViews;
