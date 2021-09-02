import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context';

const NewEventForm = () => {
  const {
    center,
    setEvents,
    newEventLoc,
    setAddEventPopupOpen,
    currentUser,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    axios.post('/api/event', {
      lat: newEventLoc.lat.toString(),
      lng: newEventLoc.lng.toString(),
      time: new Date(data.time).toString(),
      description: data.description,
      genre: data.genre,
      ownerId: currentUser.id.toString(),
    })
      .then(() => {
        axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: new Date().toString() })
          .then((results) => { setEvents(results.data); });
      })
      .catch((error) => { console.error(error); });
    setAddEventPopupOpen(false);
  };

  return (
    <>
      {currentUser.id
        ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="genre-input">Genre</label>
              <input type="text" id="genre-input" placeholder="Genre" {...register('genre', { required: true })} />
            </div>
            <div>
              <label htmlFor="description-input">Description</label>
              <input type="textarea" id="description-input" placeholder="Description" {...register('description', { required: true })} />
            </div>
            <div>
              <label htmlFor="time-input">Time</label>
              <input type="datetime-local" id="time-input" placeholder="Time" step="1" {...register('time', { required: true })} />
            </div>
            <input type="submit" />
          </form>
        )
        : <div> You must be logged in to create an event.</div>}
    </>
  );
};

export default NewEventForm;
