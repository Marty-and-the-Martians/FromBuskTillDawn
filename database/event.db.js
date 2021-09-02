const mongoose = require('mongoose');
const { Event, User } = require('./model');

// ////////////////////////      READ      ////////////////////////////////////
const readMany = async (lng, lat, range, startDate, endDate) => {
  try {
    const events = await Event
      .aggregate([
        {
          $geoNear: {
            maxDistance: range * 1609.34, // 1609.34 meters in a mile,
            distanceMultiplier: 1 / 1609.34,
            near: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            query: { time: { $gte: startDate, $lte: endDate } },
            spherical: true,
            distanceField: 'distance',
            key: 'location',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $project: {
            _id: 1,
            time: 1,
            'owner._id': 1,
            'owner.name': 1,
            'owner.photo': 1,
            // location: 0,
            'position.lng': { $arrayElemAt: ['$location.coordinates', 0] },
            'position.lat': { $arrayElemAt: ['$location.coordinates', 1] },
            genre: 1,
            description: 1,
            distance: 1,
          },
        },
      ]);
    return events;
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }
};

// ////////////////////////      CREATE      ////////////////////////////////////
const createOne = async (time, ownerId, lng, lat, genre, description) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User // i dont think I need this lookup I can just use the owner Id on the event. the only though I have is this checks to make sure the user id is in the db first, but the transaction would fail if the second user lookup fails in the findByIdAndUpdate
      .findById(mongoose.Types.ObjectId(ownerId.toString())) // probably dont need toString here
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
        performer: true,
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

// ////////////////////////      UPDATE      ////////////////////////////////////
const updateOne = async (eventId, updatedInfo) => {
  try {
    return await Event
      .updateOne({
        _id: mongoose.Types.ObjectId(eventId),
      }, updatedInfo);
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }
};

// ////////////////////////      DELETE      ////////////////////////////////////
const deleteOne = async (eventId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Event
      .findByIdAndDelete(mongoose.Types.ObjectId(eventId))
      .session(session);

    await User
      .updateMany({
        $expr: { $in: [eventId, 'hostedEvents'] },
      },
      {
        $pullAll: { hostedEvents: [eventId] },
      })
      .session(session);

    return await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Error querying DB', { cause: err });
  } finally {
    session.endSession();
  }
};

module.exports = {
  readMany,
  createOne,
  updateOne,
  deleteOne,
};
