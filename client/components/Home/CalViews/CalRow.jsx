/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import useStyles from '../../hooks/useStyles';
import AppContext from '../../../context';

import CalRowContainer from './CalRowContainer';

const CalRow = ({ event }) => {
  const classes = useStyles();
  const {
    time, owner, genre, distance,
  } = event;
  const performerId = owner[0]._id;
  const timeObj = new Date(time);
  const dateArr = timeObj.toString().split(' ');
  const eventDay = dateArr.slice(0, 3).join(' ');
  const { currentUser, myCalendar, currentPerformerProfile, setcurrentPerformerProfile } = useContext(AppContext);
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
  console.log('currentUser.name === owner[0].name', currentUser.name === owner[0].name);
  console.log('currentUser.name', currentUser.name);
  console.log('owner[0].name', owner[0].name);
  return (
    <CalRowContainer styled={currentUser.name === owner[0].name}>
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
          currentUser.name !== owner[0].name ? (
            <Button
              type="button"
              value={event._id}
              onClick={(e) => { addToMyEvents(e, event._id); }}
              className={classes.btn}
            >
              +
            </Button>
          ) : (null)
        }
      </TableCell>
    </CalRowContainer>
  );
};
export default CalRow;
