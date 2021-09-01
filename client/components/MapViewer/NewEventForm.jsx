import React, { useCallback, useState, useContext } from 'react';
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
      id: events.length,
      position: newEventLoc,
      time: data.time,
      performerId: 42,
      description: data.description,
      genre: data.genre,
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

  // const [newEvent, setNewEvent] = useState(null);
  // return (
  //   <form onSubmit={handleSubmitEvent}>
  //     <div>
  //       <label htmlFor="genre-input">Genre</label>
  //       <input type="text" id="genre-input" placeholder="Genre" />
  //     </div>
  //     <div>
  //       <label for="description-input">Description</label>
  //       <input type="textarea" id="description-input" placeholder="Description" />
  //     </div>
  //     <div>
  //       <label for="date-input">Date</label>
  //       <input type="date" id="date-input" placeholder="Date" />
  //     </div>
  //     <div>
  //       <label for="start-time-input">Start Time</label>
  //       <input type="time" id="start-time-input" placeholder="Time" />
  //     </div>
  //     <div>
  //       <label for="end-time-input">End Time</label>
  //       <input type="time" id="end-time-input" placeholder="Time" />
  //     </div>
  //     <input type="submit" />
  //   </form>
  // );
};

export default NewEventForm;
