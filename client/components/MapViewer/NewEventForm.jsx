import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import AppContext from '../../context';

const NewEventForm = () => {
  const {
    events,
    setEvents,
    newEventLoc,
    setAddEventPopupOpen,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const newEvent = {
      ...data,
      id: events.length,
      position: newEventLoc,
      performerId: 42,
    };
    setAddEventPopupOpen(false);
    setEvents((currEvents) => (
      [
        ...currEvents,
        newEvent,
      ]
    ));
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
