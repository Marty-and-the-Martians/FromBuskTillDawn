/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../context';
import cleanPerformerEvents from '../../helperFuncs/cleanPerformerEvents';

const PerformerProfile = () => {
  const { currentPerformerProfile, center } = useContext(AppContext);
  const [performerData, setPerformerData] = useState({});
  const [performerEvents, setPerformerEvents] = useState([]);
  const {
    bio, followers, name, cashappURL, photo,
  } = performerData;

  const cashApp = cashappURL || "You Can't Pay Me";

  const perfEvents = () => {
    axios.get(`/api/event/${currentPerformerProfile}?lng=${center.lng}&lat=${center.lat}`)
      .then((results) => {
        const cleaned = (cleanPerformerEvents(results.data))[0];
        setPerformerEvents(cleaned);
      });
  };
  const perfInfo = () => {
    axios.get(`/api/user/${currentPerformerProfile}`)
      .then((result) => { setPerformerData(result.data[0]); });
  };

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

  const daySlice = (timeObj) => {
    const dateArr = timeObj.toString().split(' ');
    const eventDay = dateArr.slice(0, 3).join(' ');
    return eventDay;
  };

  useEffect(() => {
    if (currentPerformerProfile.length) {
      perfEvents();
      perfInfo();
    }
  }, [currentPerformerProfile]);

  const events = performerEvents.length ? (performerEvents.map((event) => (
    <div key={event._id}>{`${event.description} at ${formatTime(new Date(event.time))} on ${daySlice(new Date(event.time))}`}</div>
  ))) : <div> No Events Scheduled </div>;

  console.log('Performer Info: ', performerData, 'Event Info: ', performerEvents);

  return (
    <>
      { performerData && performerEvents.length
        ? (
          <div>
            <h3>Performer Profile </h3>
            <img src={photo} alt="profile avatar" />
            <div>{`Name: ${name}`}</div>
            <div>{`Pay Via Cashapp: ${cashApp}`}</div>
            <div>{`Bio: ${bio}`}</div>

            <div>{`Follower Count: ${followers}`}</div>
            <div>
              Upcoming Performances:
              {events}
            </div>
          </div>
        )
        : <div>Loading</div>}
    </>
  );
};

export default PerformerProfile;
