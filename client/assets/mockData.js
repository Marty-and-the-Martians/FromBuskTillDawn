const user = {
  _id: 52,
  name: 'Keanu',
  date: 'Wed Sep 01 2021 11:15:53 GMT-0600 (Mountain Daylight Time)',
  performer: true,
  zipcode: 80211,
  photo:
    'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
  bio: 'dkafshll;alhfjkalhdflkjdhasfjlhdf',
  followers: 42,
  cashappURL: 'URL_STRING',
};

const user2 = {
  _id: 52,
  name: 'JJ',
  date: new Date(),
  performer: true,
  zipcode: 80211,
  photo:
  'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f95?s=400&d=robohash&r=x',
  bio: 'dkafshll;alhfjkalhdflkjdhasfjlhdf',
  followers: 42,
  cashappURL: 'URL_STRING',
  hostedEvents: [
    {
      _id: 2,
      time: new Date(),
      position: {
        lat: 39.742043,
        lng: -104.991531,
      },
      distance: 3.81,
      genre: 'Juggling',
      description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
    },
  ],
};

const mockEvents = [
  {
    _id: 1,
    time: new Date('2021-09-15T13:26:26'),
    owner: {
      _id: 52,
      name: 'Keanu',
      photo:
        'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
    },
    position: {
      lat: 39.742043,
      lng: -104.993531,
    },
    distance: 3.81, // in miles
    genre: 'Progressive Ska',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 2,
    time: new Date('2021-09-02T15:30:48'),
    owner: {
      _id: 61,
      name: 'Alisha',
      photo:
        'https://gravatar.com/avatar/6a7f448bc5aaff2d0f0a81167f70ff38?s=400&d=robohash&r=x',
    },
    distance: 4.81, // in miles
    position: {
      lat: 39.752551,
      lng: -104.991269,
    },
    genre: 'Non-Progressive Ska',
    description: 'adskfjhkjafd;alkjfl;kaJDSFASK;LF',
  },
  {
    _id: 3,
    time: new Date('2021-09-01T14:30:00'),
    owner: {
      _id: 101,
      name: 'AJT',
      photo:
        'https://gravatar.com/avatar/9e31e32a0b1284d42c510218303c7182?s=400&d=robohash&r=x',
    },
    distance: 5.81, // in miles
    position: {
      lat: 39.732454,
      lng: -104.991508,
    },
    genre: 'Cool guitar noises',
    description: 'An actual musician! Performing for you!',
  },
  {
    _id: 4,
    time: new Date(),
    owner: {
      _id: 63,
      name: 'Keanu',
      photo:
        'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f81?s=400&d=robohash&r=x',
    },
    position: {
      lat: 39.742059,
      lng: -104.991500,
    },
    distance: 12.1, // in miles
    genre: 'Progressive Ska',
    description: 'A second progressive ska show',
  },
  {
    _id: 5,
    time: new Date('2021-09-02T18:30:22'),
    owner: {
      _id: 69,
      name: 'JJ',
      photo:
        'https://gravatar.com/avatar/11c2e8cbf73864f8a3ced656f29d2f95?s=400&d=robohash&r=x',
    },
    position: {
      lat: 39.742721,
      lng: -104.991321,
    },
    distance: 2.43, // in miles
    genre: 'Chainsaw Juggling',
    description: 'He genuinely may hurt himself. Limited shows!!',
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
  hostedEvents: myEvents.hostedEvents,
};

export default {
  user,
  user2,
  mockEvents,
  loggedOnUser,
  myEvents,
  theirEvents,
};
