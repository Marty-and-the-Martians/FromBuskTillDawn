import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AppContext from '../../../context';
import useStyles from '../../hooks/useStyles';
import cleanMyCal from '../../../helperFuncs/cleanMyCal';

import CalRow from './CalRow';

const CalViews = () => {
  const classes = useStyles();
  const [sortedEvents, setSortedEvents] = useState([]);
  const { events, center, currentUser, loggedIn } = useContext(AppContext);
  const [eventsAttending, setEventsAttending] = useState([]);

  const sortTime = () => {
    setSortedEvents([...events].sort((a, b) => (new Date(a.time) - new Date(b.time))));
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
    if (loggedIn) {
      axios.get(`/api/event/${currentUser.id}?lng=${center.lng}&lat=${center.lat}`)
        .then((results) => {
          const cleaned = (cleanMyCal(results.data))[0];
          setEventsAttending(cleaned);
        });
    }
  }, [loggedIn, events.length]);

  useEffect(() => {
    if (events.length) {
      sortTime();
    }
  }, [events]);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell onClick={sortName} className={classes.colName}>Busker</TableCell>
            <TableCell onClick={sortGenre} className={classes.colName}>Genre</TableCell>
            <TableCell onClick={sortTime} className={classes.colName}>Date</TableCell>
            <TableCell onClick={sortTime} className={classes.colName}>Time</TableCell>
            <TableCell onClick={sortDistance} className={classes.colName}>Distance</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedEvents.map((event) => (

            <CalRow event={event} key={event._id} minus={eventsAttending.some((currEvent) => (currEvent._id === event._id))} eventsAttending={eventsAttending} setEventsAttending={setEventsAttending} />
          ))}
        </TableBody>
        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div onClick={sortName} value="performer" style={{ cursor: 'pointer' }}> Busker </div>
        <div onClick={sortGenre} value="genre" style={{ cursor: 'pointer' }}> Genre </div>
        <div onClick={sortTime} value="date" style={{ cursor: 'pointer' }}> Date </div>
        <div onClick={sortTime} value="date" style={{ cursor: 'pointer' }}> Time </div>
        <div onClick={sortDistance} value="distance" style={{ cursor: 'pointer' }}> Distance </div>
      </div> */}
      </Table>
    </TableContainer>
  );
};
export default CalViews;
