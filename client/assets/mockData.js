const user = {
  id: 52,
  name: 'Keanu',
  date: new Date(),
  performer: true,
  zipcode: 80211,
  photo: 'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
  bio: 'dkafshll;alhfjkalhdflkjdhasfjlhdf',
  followers: 42,
  cashappURL: 'URL_STRING',
  hostedEvents: [
    {
      _id: 1,
      time: new Date(),
      position: {
        lat: 39.742043,
        lng: -104.991531,
      },
      distance: 3.81,
      genre: 'Progressive Ska',
      description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
    },
  ],
};

const events = [
  {
    _id: 1,
    time: new Date(),
    owner: {
      id: 52,
      name: 'Keanu',
      photo: 'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
    },
    position: {
      lat: 39.742043,
      lng: -104.991531,
    },
    distance: 3.81, // in miles
    genre: 'Progressive Ska',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 2,
    time: new Date(),
    owner: {
      id: 61,
      name: 'Alisha',
      photo: 'https://gravatar.com/avatar/6a7f448bc5aaff2d0f0a81167f70ff38?s=400&d=robohash&r=x',
    },
    distance: 4.81, // in miles
    position: {
      lat: 39.752043,
      lng: -104.991531,
    },
    genre: 'Non-Progressive Ska',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 3,
    time: new Date(),
    owner: {
      id: 101,
      name: 'AJT',
      photo: 'https://gravatar.com/avatar/9e31e32a0b1284d42c510218303c7182?s=400&d=robohash&r=x',
    },
    distance: 5.81, // in miles
    position: {
      lat: 39.732043,
      lng: -104.991531,
    },
    genre: 'Cool guitar noises',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
];

const loggedOnUser = {
  ...user,
  email: 'keanu@email.com',
};

export default {
  user,
  events,
  loggedOnUser,
};
