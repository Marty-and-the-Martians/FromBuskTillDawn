const user = {
  _id: 52,
  name: 'Keanu',
  date: new Date(),
  performer: true,
  zipcode: 80211,
  photo:
    'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
  bio: 'dkafshll;alhfjkalhdflkjdhasfjlhdf',
  followers: 42,
  cashappURL: 'URL_STRING',
};

const mockEvents = [
  {
    _id: 1,
    time: new Date(),
    owner: {
      _id: 52,
      name: 'Keanu',
      photo:
        'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
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
      _id: 61,
      name: 'Alisha',
      photo:
        'https://gravatar.com/avatar/6a7f448bc5aaff2d0f0a81167f70ff38?s=400&d=robohash&r=x',
    },
    distance: 4.81, // in miles
    position: {
      lat: 39.752551,
      lng: -104.991249,
    },
    genre: 'Non-Progressive Ska',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 3,
    time: new Date(),
    owner: {
      _id: 101,
      name: 'AJT',
      photo:
        'https://gravatar.com/avatar/9e31e32a0b1284d42c510218303c7182?s=400&d=robohash&r=x',
    },
    distance: 5.81, // in miles
    position: {
      lat: 39.732154,
      lng: -104.991508,
    },
    genre: 'Cool guitar noises',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 4,
    time: new Date(),
    owner: {
      _id: 69,
      name: 'JJ',
      photo:
        'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
    },
    position: {
      lat: 39.742021,
      lng: -104.991521,
    },
    distance: 2.43, // in miles
    genre: 'Chainsaw Juggling',
    description: 'asakdjfh;saldkfh',
  },
];

const loggedOnUser = {
  ...user,
  email: 'keanu@email.com',
};

const myEvents = {
  _id: 42,
  hostedEvents: [
    {
      _id: 1,
      time: new Date(),
      owner: {
        _id: 52,
        name: 'Keanu',
        photo:
          'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
      },
      position: {
        lat: 39.742043,
        lng: -104.991531,
      },
      distance: 3.81, // in miles
      genre: 'Progressive Ska',
      description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
    },
  ],
  attendingEvents: [
    {
      _id: 2,
      time: new Date(),
      owner: {
        _id: 61,
        name: 'Alisha',
        photo:
          'https://gravatar.com/avatar/6a7f448bc5aaff2d0f0a81167f70ff38?s=400&d=robohash&r=x',
      },
      distance: 4.81, // in miles
      position: {
        lat: 39.752551,
        lng: -104.991249,
      },
      genre: 'Non-Progressive Ska',
      description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
    },
    {
      _id: 3,
      time: new Date(),
      owner: {
        _id: 101,
        name: 'AJT',
        photo:
          'https://gravatar.com/avatar/9e31e32a0b1284d42c510218303c7182?s=400&d=robohash&r=x',
      },
      distance: 5.81, // in miles
      position: {
        lat: 39.732154,
        lng: -104.991508,
      },
      genre: 'Cool guitar noises',
      description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
    },
    {
      _id: 4,
      time: new Date(),
      owner: {
        _id: 69,
        name: 'JJ',
        photo:
          'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
      },
      position: {
        lat: 39.742021,
        lng: -104.991521,
      },
      distance: 2.43, // in miles
      genre: 'Chainsaw Juggling',
      description: 'asakdjfh;saldkfh',
    },
  ],
};

const theirEvents = {
  _id: myEvents._id,
  hostedEvents: myEvents.hostedEvetns,
};

export default {
  user,
  mockEvents,
  loggedOnUser,
  myEvents,
  theirEvents,
};
