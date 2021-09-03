/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import useStyles from '../../hooks/useStyles';
import AppContext from '../../../context';

const CalRow = ({ event, minus }) => {
  const classes = useStyles();
  const {
    time, owner, genre, distance,
  } = event;
  const performerId = owner[0]._id;
  const timeObj = new Date(time);
  const dateArr = timeObj.toString().split(' ');
  const eventDay = dateArr.slice(0, 3).join(' ');
  const {
    currentUser, myCalendar, currentPerformerProfile, setcurrentPerformerProfile, setSelected,
  } = useContext(AppContext);
  // const [attending, setAttending] = useState(false);
  // let attending = false;
  // useEffect(() => {
  //   eventsAttending.forEach((currEvent) => {
  //     if (currEvent._id === event._id) {
  //       setAttending(true);
  //     }
  //   });
  // }, []);

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
      .then(myCalendar());
  };

  const userNameClick = (e, id) => {
    // const id = e.target.getAttribute('id');
    setcurrentPerformerProfile(id);
  };

  const rowStyle = (() => {
    if (currentUser.name === owner[0].name) {
      return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: 'solid 1px #e5c163',
      };
    }
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
  })();

  if (currentPerformerProfile.length) {
    return <Redirect to="/performer" />;
  }
  console.log(minus);
  return (
    <TableRow onClick={() => { setSelected(event); console.log(event); }} color={currentUser.name === owner[0].name ? 'secondary' : 'primary'}>
      <TableCell>
        <Avatar
          alt={owner[0].name}
          src={owner[0].photo}
        />
        {/* <img
          src={owner.photo}
          alt="avatar of this busker"
          style={{ maxHeight: '2rem', maxWidth: '2rem' }}
        /> */}
      </TableCell>
      <TableCell
        onClick={(e) => { userNameClick(e, performerId); }}
        id={performerId}
        className={classes.userName}
      >
        {owner[0].name}
      </TableCell>
      <TableCell>{genre}</TableCell>
      <TableCell>{eventDay}</TableCell>
      <TableCell>{prettyTime}</TableCell>
      <TableCell>{`${distance.toFixed(2)} mi.`}</TableCell>
      <TableCell>
        {
          minus ? (
            <Button
              type="button"
              value={event._id}
              onClick={(e) => { addToMyEvents(e, event._id); }}
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
    </TableRow>
    // <div
    //   style={rowStyle}
    //   value={event._id}
    // >
    //   <img
    //     src={owner.photo}
    //     alt="avatar of this busker"
    //     style={{ maxHeight: '2rem', maxWidth: '2rem' }}
    //   />
    //   <div onClick={userNameClick} id={performerId} style={{ cursor: 'pointer' }}>{owner[0].name}</div>
    //   <div>{genre}</div>
    //   <div>{eventDay}</div>
    //   <div>{prettyTime}</div>
    //   <div>{`${distance.toFixed(2)} miles`}</div>
    //   {currentUser.name === owner[0].name
    //     ? <div />
    //     : <button type="button" value={event._id} onClick={addToMyEvents} style={{ cursor: 'pointer' }}> + </button>}
    // </div>
  );
};
export default CalRow;
