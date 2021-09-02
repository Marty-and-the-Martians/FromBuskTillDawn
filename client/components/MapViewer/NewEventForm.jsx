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
    // const newEvent = {
    //   id: events.length,
    //   position: newEventLoc,
    //   time: new Date(data.time.toString()),
    //   performerId: 42,
    //   description: data.description,
    //   genre: data.genre,
    //   owner: {
    //     _id: Math.random(),
    //     name: 'totes Real User',
    //     photo:
    //       'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
    //   },
    //   distance: (Math.random() * 10).toFixed(2),
    // };
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
      .catch((error) => {console.error(error)});
    setAddEventPopupOpen(false);
  };

  return (
    <>
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
    </>
  );
};

export default NewEventForm;
