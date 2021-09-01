const mongoose = require('mongoose');
const { Event, User } = require('./model');

const readMany = async (lng, lat, range, startDate, endDate) => {
  try {
    const events = await Event
      .aggregate([{
        $geoNear: {
          maxDistance: range * 1609.34, // 1609.34 meters in a mile,
          distanceMultiplier: 1 / 1609.34,
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          spherical: true,
          distanceField: 'distance',
          key: 'location',
        },
      },
      ]);
    return events;
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }
};

const createOne = async (time, ownerId, lng, lat, genre, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User
      .findById(mongoose.Types.ObjectId(ownerId.toString()))
      .session(session);

    const event = new Event({
      time,
      owner: user.id,
      location: {
      // [parseFloat(lng), parseFloat(lat)],
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      genre,
      description,
    });

    await event.save();

    await User
      .findByIdAndUpdate(mongoose.Types.ObjectId(ownerId), {
        $push: { hostedEvents: event.id },
      })
      .session(session);

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Error querying DB', { cause: err });
  } finally {
    session.endSession();
  }
};

const updateOne = async (eventId, time, position, genre, description) => {
  try {
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }
};

const deleteOne = async (eventId) => {
  try {
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }
};

module.exports = {
  readMany,
  createOne,
  updateOne,
  deleteOne,
};
