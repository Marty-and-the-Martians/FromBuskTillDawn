/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import AppContext from '../../../context';

const CalRow = (props) => {
  const { time, owner, genre, distance } = props.event;
  const timeObj = new Date(time);
  const dateArr = timeObj.toString().split(' ');
  const eventDay = dateArr.slice(0, 3).join(' ');
  const currentUser = 'Keanu';
  const { userNameClick } = useContext(AppContext);


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
  console.log(timeObj);

  const addToMyEvents = (e) => {
    console.log(e);
  };

  const rowStyle = (() => {
    if (currentUser === owner.name) {
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

  return (
    <div
      style={rowStyle}
    >
      <img
        src={owner.photo}
        alt="avatar of this busker"
        style={{ maxHeight: '2rem', maxWidth: '2rem' }}
      />
      <div onClick={userNameClick} name={owner.name} style={{ cursor: 'pointer' }}>{owner.name}</div>
      <div>{genre}</div>
      <div>{eventDay}</div>
      <div>{prettyTime}</div>
      <div>{`${distance.toFixed(2)} miles`}</div>
      <button type="button" onClick={addToMyEvents} style={{ cursor: 'pointer' }}>
        +
      </button>
    </div>
  );
};
export default CalRow;
