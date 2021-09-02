const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const { eventDb, userDb } = require('../../database');

const readMany = async (userId, lng, lat, range = 50, startDate = (new Date()).toString()) => {
  // filter data off the req here
  // if you need to use any helper functions this is where its done.
  // formating data, dates, etc...

  // verify valid session here

  const start = startOfDay(new Date(startDate));
  const endDate = endOfDay(new Date(startDate));

  // let start;
  // if (typeof startDate === 'string') {
  //   start = new Date(startDate);
  // } else { // otherwise its a date from
  //   start = startDate;
  // }
  // start = new Date(start.getTime() - 0.5 * 24 * 60 * 60 * 1000);
  // const endDate = new Date(start.getTime() + 1 * 24 * 60 * 60 * 1000);
  let events;
  if (userId) {
    events = await userDb.readUserSchedule(userId, lng, lat, range, start, endDate);
  } else {
    events = await eventDb.readMany(lng, lat, range, start, endDate);
  }
  return events;
};

const create = async (time = new Date(), ownerId, lng, lat, genre, description) => {
  // verify valid session here
  // const time = new Date(time.getTime() - 1 * 24 * 60 * 60 * 1000);
  return eventDb.createOne(time, ownerId, lng, lat, genre, description);
};

const update = async (eventId, updatedInfo) => {
  // verify valid session here
  if (updatedInfo.lng || updatedInfo.lat) {
    const otherInfo = {};
    const {
      lat,
      lng,
      time,
      genre,
      description,
    } = updatedInfo;
    if (time) otherInfo.time = time;
    if (genre) otherInfo.genre = genre;
    if (description) otherInfo.description = description;
    otherInfo.location = {
      type: 'Point',
      coordinates: [lng, lat],
    };
    return eventDb.updateOne(eventId, otherInfo);
  }
  return eventDb.updateOne(eventId, updatedInfo);
};

const deleteEvent = async (eventId) => {
  // verify valid session here
  return eventDb.deleteOne(eventId)
};

module.exports = {
  readMany,
  create,
  update,
  deleteEvent,
};
