const { userDb } = require('../../database');

const readOne = async (userId) => {
  // filter data off the req here
  // if you need to use any helper functions this is where its done.
  // formating data, dates, etc...

  // verify valid session here

  return userDb.readOne(userId);

  // add anything to the response here
  // return response here
};

const createOne = async () => {
};

const update = async (userId, updatedInfo) => {
  // verify valid session here
  // const updatedInfo = {};

  // if (name) updatedInfo.name = name;
  // if (email) updatedInfo.email = email;
  // if (zipcode) updatedInfo.zipcode = zipcode;
  // if (photoURL) updatedInfo.photo = photoURL;
  // if (bio) updatedInfo.bio = bio;
  // if (cashappURL) updatedInfo.cashAppURL = cashappURL;

  return userDb.updateOne(userId, updatedInfo);
};

const addAttendingEvent = async (userId, eventId) => {
  return await userDb.updateAttendingEvent(userId, eventId);
};

const deleteAttendingEvent = async (userId, eventId) => {
  // verify valid session here

  return userDb.deleteOneAttendingEvent(userId, eventId);
};

module.exports = {
  readOne,
  createOne,
  update,
  addAttendingEvent,
  deleteAttendingEvent,
};
