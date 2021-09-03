/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import CalRowContainer from './CalRowContainer';

import useStyles from '../../hooks/useStyles';
import AppContext from '../../../context';

const CalRow = ({ event, minus, eventsAttending, setEventsAttending }) => {
  const classes = useStyles();
  const {
    time, owner, genre, distance,
  } = event;
  const performerId = owner[0]._id;
  const timeObj = new Date(time);
  const dateArr = timeObj.toString().split(' ');
  const eventDay = dateArr.slice(0, 3).join(' ');
  const {
    currentUser, eventFetch, myCalendar, currentPerformerProfile, setcurrentPerformerProfile, setSelected, setEvents, events,
  } = useContext(AppContext);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  const prettyTime = formatTime(timeObj);

  const addToMyEvents = (e, eventId) => {
    // const eventId = e.target.attributes[1].value;
    const userId = currentUser.id;
    axios
      .put(`/api/user/${userId}/${eventId}`)
      .then(setEventsAttending([...eventsAttending, event]))
      .then(eventFetch());
  };

  const removeEvent = (e, eventId) => {
    const userId = currentUser.id;
    if (performerId === userId) {
      axios.delete(`/api/event/${eventId}`)
        .then(() => {
          const copy = events.slice();
          const idx = copy.findIndex((event) => (event._id === eventId));
          copy.splice(idx, 1);
          setEvents(copy);
        })
        .then(myCalendar());
    } else {
      axios.delete(`/api/user/${userId}/${eventId}`)
        .then(() => {
          const copy = eventsAttending.slice();
          const idx = copy.findIndex((event) => (event._id === eventId));
          copy.splice(idx, 1);
          setEventsAttending(copy);
        })
        .then(eventFetch());
    }
  };

  const userNameClick = (e, id) => {
    // const id = e.target.getAttribute('id');
    setcurrentPerformerProfile(id);
  };

  if (currentPerformerProfile.length) {
    return <Redirect to="/performer" />;
  }

  return (
    <CalRowContainer
      onClick={() => {
        setSelected(event); console.log(event);
      }}
      styled={currentUser.name === owner[0].name}
    >
      <TableCell className={classes.smallCell}>
        <Avatar
          alt={owner[0].name}
          src={owner[0].photo}
        />
      </TableCell>
      <TableCell
        onClick={(e) => { userNameClick(e, performerId); }}
        id={performerId}
        className={classes.userName}
      >
        {owner[0].name}
      </TableCell>
      <TableCell className={classes.bigCell}>{genre}</TableCell>
      <TableCell className={classes.bigCell}>{eventDay}</TableCell>
      <TableCell className={classes.bigCell}>{prettyTime}</TableCell>
      <TableCell className={classes.bigCell}>{`${distance.toFixed(2)} mi.`}</TableCell>
      <TableCell className={classes.smallCell}>
        {
          minus ? (
            <Button
              type="button"
              value={event._id}
              onClick={(e) => { removeEvent(e, event._id); }}
              className={classes.btn}
            >
              -
            </Button>
          ) : (
            <Button
              type="button"
              value={event._id}
              onClick={(e) => { addToMyEvents(e, event._id); }}
              className={classes.btn}
            >
              +
            </Button>
          )
        }
      </TableCell>
    </CalRowContainer>
  );
};
export default CalRow;
