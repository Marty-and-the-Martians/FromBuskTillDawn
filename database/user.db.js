const mongoose = require('mongoose');
const { User } = require('./model');

// ////////////////////////      READ      ////////////////////////////////////
const readOne = async (userId) => {
  try {
    const userInfo = {
      _id: 1,
      name: 1,
      date: 1,
      performer: 1,
      zipcode: 1,
      photo: 1,
      bio: 1,
      followers: 1,
      cashappUrl: 1,
    };

    const user = await User
      .aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(userId) },
        },
        {
          $project: userInfo,
        },
      ]);
    return user;
  } catch (err) {
    throw new Error('Error querying DB', { cause: err });
  }

const readUserSchedule = async (userId, lng, lat) => {
  try {
    const events = await User
      // .find({_id: userId})
      .aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'events',
            let: {
              userId: '$_id', eventIds: '$hostedEvents',
            },
            // localField: 'hostedEvents',
            // foreignField: '_id',
            pipeline: [
              {
                $geoNear: {
                  // maxDistance: range * 1609.34, // 1609.34 meters in a mile,
                  distanceMultiplier: 1 / 1609.34,
                  near: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                  },
                  spherical: true,
                  query: { $expr: { $eq: ['$owner', '$$userId'] } },
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
            ],
            as: 'hostedEvents',
          },
        },
        {
          $lookup: {
            from: 'events',
            let: {
              userId: '$_id',
            },
            // localField: 'hostedEvents',
            // foreignField: '_id',
            pipeline: [
              {
                $geoNear: {
                  // maxDistance: range * 1609.34, // 1609.34 meters in a mile,
                  distanceMultiplier: 1 / 1609.34,
                  near: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                  },
                  spherical: true,
                  query: { $expr: { $ne: ['$owner', '$$userId'] } },
                  // owner: '$$userId' },
                  // { _id: '$$hostedEvent' },
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
            ],
            as: 'attendingEvents',
          },
        },
        {
          $project: {
            _id: 1,
            hostedEvents: 1,
            attendingEvents: 1,
          },
        },
      ]);
    return events;
  } catch (err) {
    throw new Error('error Querying DB', { cause: err });
  }
};

// ////////////////////////      CREATE      ////////////////////////////////////
const createOne = async () => { };

// ////////////////////////      UPDATE      ////////////////////////////////////
const updateOne = async () => {
};

// ////////////////////////      DELETE      ////////////////////////////////////
const deleteAttendingEvent = async () => {
};

module.exports = {
  readOne,
  readUserSchedule,
  createOne,
  updateOne,
  deleteAttendingEvent,
};
