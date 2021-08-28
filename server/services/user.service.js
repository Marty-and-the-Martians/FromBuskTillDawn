const { user } = require('../../database');

const getOne = async () => {
  // filter data off the req here
  // if you need to use any helper functions this is where its done.
  // formating data, dates, etc...
  const singleUser = await user.read();

  // add anything to the response here
  // return response here
};

module.exports = {
  getOne,
};
