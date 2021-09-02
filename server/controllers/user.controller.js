const { user } = require('../services');

const getUser = (req, res, next) => {
  // do we distinguish between a logged in user and any other user to view info on the request?
  // take info off req
  const { params: { userId } } = req;
  user.readOne(userId)
    .then((requestedUser) => {
      res.send(requestedUser);
    })
    .catch((err) => {
      // handle errors to reflect 400/500
      res.sendStatus(400);
    });
};

const loginUser = (req, res, next) => { };

const registerUser = (req, res, next) => { };

const updateUser = (req, res, next) => {
  // date cant be updated
  // hostedEventId only gets added when events are added

  const {
    params: { userId },
    query: {
      attendingEventId,
    },
    body: {
      name,
      email,
      performer,
      zipcode,
      photoURL,
      bio,
      cashappURL,
    },
  } = req;

  // const { params, query, body } = req;
  user.update(userId, name, email, performer, zipcode, photoURL, bio, cashappURL, attendingEventId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      //handle errors to reflect 400/500
      res.sendStatus(400);
    });
};

const deleteEvent = (req, res, next) => {
  const { params: { userId, eventId } } = req;
  user.deleteAttendingEvent(userId, eventId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      //handle errors to reflect 400/500
      res.sendStatus(400);
    });
};

module.exports = {
  get: {
    getUser,
  },
  post: {
    loginUser,
    registerUser,
  },
  put: {
    updateUser,
  },
  delete: {
    deleteEvent,
  },
};
