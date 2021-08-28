const { user } = require('../services');

const getOne = (req, res, next) => {
  // take info off req
  user.getOne()
    .then() // send 200
    .catch(); // send 400 or 500
};
module.exports = {
  get: getOne,
  post: {
    postFunc1: () => {},
    postFunc2: () => {},
  },
};
