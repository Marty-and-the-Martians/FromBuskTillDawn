const { event } = require('../services');

const getEvents = (req, res, next) => {
  // take info of query or body if needed
  // how do we determine how many events to send by default? we want to populate the map but not slow it down
  // should we have a show event in range (x), have it be selectable with a max?
  // then instead of page and count we just  send back allevvent in range?
  // filter by: date, event host, proximity (sort by distance)
  // how do we determine proximity quickly without iterating an array?
  // trig/pathag with lat/long in the query?

  // might not need userID
  // const { params, query, body } = req;
  const { params: { userId }, query: { lng, lat, range }, body: { date } } = req;
  event.readMany(userId, lng, lat, range, date)
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      //handle different types of errors here to send back either a 400 or a 500
      res.sendStatus(400);
    });
};

const postEvent = (req, res, next) => {
  const {
    body: {
      time,
      ownerId,
      lng,
      lat,
      genre,
      description,
    },
  } = req;

  event.create(time, ownerId, lng, lat, genre, description)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      //handle different types of errors here to send back either a 400 or a 500
      res.sendStatus(400);
    });
};

const updateEvent = (req, res, next) => {
  // const { body: { time, position, genre, description } }
  const { body, params: { eventId } } = req;

  event.update(eventId, time, position, genre, description)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      //handle different types of errors here to send back either a 400 or a 500
      res.sendStatus(400);
    });
};

const deleteEvent = (req, res, next) => {
  const { params: { eventId } } = req;

  event.deleteEvent(eventId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      //handle different types of errors here to send back either a 400 or a 500
      res.sendStatus(400);
    });
};

module.exports = {
  get: {
    getEvents,
  },
  post: {
    postEvent,
  },
  put: {
    updateEvent,
  },
  delete: {
    deleteEvent,
  },
};
