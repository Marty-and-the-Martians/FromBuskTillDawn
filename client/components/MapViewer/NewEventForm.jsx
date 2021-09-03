import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DateInput from '../DateInput';
import AppContext from '../../context';
import useStyles from '../hooks/useStyles';

const NewEventForm = () => {
  const classes = useStyles();
  const {
    center,
    setEvents,
    newEventLoc,
    setAddEventPopupOpen,
    currentUser,
    eventFetchDate,
  } = useContext(AppContext);

  const [eventDate, setEventDate] = useState(new Date(eventFetchDate));
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  // const {
  //   register,
  //   handleSubmit,
  // } = useForm();

  // const onSubmit = (data) => {
  //   axios.post('/api/event', {
  //     lat: newEventLoc.lat.toString(),
  //     lng: newEventLoc.lng.toString(),
  //     time: new Date(data.time).toString(),
  //     description: data.description,
  //     genre: data.genre,
  //     ownerId: currentUser.id.toString(),
  //   })
  //     .then(() => {
  //       axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: new Date().toString() })
  //         .then((results) => { setEvents(results.data); });
  //     })
  //     .catch((error) => { console.error(error); });
  //   setAddEventPopupOpen(false);
  // };

  const handleSubmit = (data) => {
    axios.post('/api/event', {
      lat: newEventLoc.lat.toString(),
      lng: newEventLoc.lng.toString(),
      time: eventDate,
      description,
      genre,
      ownerId: currentUser.id.toString(),
    })
      .then(() => {
        axios.get(`/api/event?lng=${center.lng}&lat=${center.lat}`, { date: eventDate })
          .then((results) => { setEvents(results.data); });
      })
      .catch((error) => { console.error(error); });
    setAddEventPopupOpen(false);
  };

  const handleChange = (date) => {
    setEventDate(date.toString());
  };

  return (
    <>
      {currentUser.id
        ? (
          <form onSubmit={handleSubmit}>
            <Container>
              <TextField
                onChange={(e) => (setGenre(e.target.value))}
                id="genre"
                name="genre"
                label="Genre"
              />
            </Container>
            <Container>
              <TextField
                onChange={(e) => (setDescription(e.target.value))}
                id="description"
                name="description"
                label="Description"
              />
            </Container>
            <Container>
              <DateInput
                selectedDate={eventDate}
                handleChange={handleChange}
              />
            </Container>
            <Container>
              <Button type="submit" variant="contained">Add Event</Button>
            </Container>

            {/* <div>
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
            <input type="submit" /> */}
          </form>
        )
        : <div> You must be logged in to create an event.</div>}
    </>
  );
};

export default NewEventForm;
