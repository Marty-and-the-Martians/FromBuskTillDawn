const mongoose = require('mongoose');
// const db = require('../../config/keys').mongoURI;

const { Schema } = mongoose;

// Mongo Connect
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('Mongo DB hath done a connect'))
//   .catch((err) => console.log('MonGod said no. This is why: ', err));

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
  photo: {
    type: String,
    default: null,
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Event: mongoose.model('Event', EventSchema),
};
