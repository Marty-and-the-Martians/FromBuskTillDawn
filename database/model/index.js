const mongoose = require('mongoose');
// const db = require('../../config/keys').mongoURI;

const { Schema } = mongoose;

// Mongo Connect
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('Mongo DB hath done a connect'))
//   .catch((err) => console.log('MonGod said no. This is why: ', err));

const LocationSchema = new Schema({
  // location will change to position when I query if
  // aliasing is easy. Location makes more sense anyway.
  // This is a geoJson object so we can create an index
  // {
  //   type: "Point"
  //   coordinates: [lng, lat]
  // }

  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number], // [lng, lat]
    required: true,
    index: '2dsphere',
  },
});

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
  following: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  hostedEvents: [{
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  }],
  attendingEvents: [{
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  }],
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
  //   type: [Number],
  //   index: '2dsphere',
  //   required: true,
  // },
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  // location: LocationSchema,
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
