import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../context';
import CalRow from './CalRow';

const CalViews = () => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const { events } = useContext(AppContext);

  const sortTime = () => {
    setSortedEvents([...events].sort((a, b) => (a.time - b.time)));
  };
  const sortDistance = () => {
    setSortedEvents([...events].sort((a, b) => (a.distance - b.distance)));
  };
  const sortGenre = () => {
    setSortedEvents([...events].sort((a, b) => {
      const first = a.genre.toUpperCase();
      const second = b.genre.toUpperCase();
      if (first < second) { return -1; }
      if (second < first) { return 1; }
      return 0;
    }));
  };
  const sortName = () => {
    setSortedEvents([...events].sort((a, b) => {
      const first = a.owner[0].name.toUpperCase();
      const second = b.owner[0].name.toUpperCase();
      if (first < second) { return -1; }
      if (second < first) { return 1; }
      return 0;
    }));
  };

  useEffect(() => {
    // console.log(events.time);
    if (events.length) {
      sortTime();
    }
  }, [events]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div onClick={sortName} value="performer" style={{ cursor: 'pointer' }}> Busker </div>
        <div onClick={sortGenre} value="genre" style={{ cursor: 'pointer' }}> Genre </div>
        <div onClick={sortTime} value="date" style={{ cursor: 'pointer' }}> Date </div>
        <div onClick={sortTime} value="date" style={{ cursor: 'pointer' }}> Time </div>
        <div onClick={sortDistance} value="distance" style={{ cursor: 'pointer' }}> Distance </div>
      </div>
      {sortedEvents.map((event) => (
        <CalRow event={event} key={event._id} />
      ))}
    </>
  );
};
export default CalViews;
