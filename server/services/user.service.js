const { userDb } = require('../../database');

const readOne = async (userId) => {
  // filter data off the req here
  // if you need to use any helper functions this is where its done.
  // formating data, dates, etc...

  // verify valid session here

  return userDb.readOne(userId, wantOwnInfo);

  // add anything to the response here
  // return response here
};

const createOne = async () => {
};

const update = async (userId, name, email, performer, zipcode, photoURL, bio, cashappURL, attendingEventId) => {
  // verify valid session here

  return userDb.updateOne(userId, name, email, performer, zipcode, photoURL, bio, cashappURL, attendingEventId);
};

const deleteAttendingEvent = async (userId) => {
  // verify valid session here

  return userDb.deleteOne(userId);
};

module.exports = {
  readOne,
  createOne,
  update,
  deleteAttendingEvent,
};
