const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  performer: {
    type: Boolean,
    default: false,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  photo: String,
  bio: String,
  followers: Number,
  cashappURL: String,
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  hostedEvents: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    },
  ],
  attendingEvents: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    },
  ],
});

const EventSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  owner: {
    type: Number,
    required: true,
  },
  position: {
    lat: Number,
    lng: Number,
  },
  genre: {
    type: String,
    required: true,
  },
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Event: mongoose.model('Event', EventSchema),
};
