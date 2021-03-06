const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
// Load input validation
const validateLoginInput = require('../../../validation/login');
// Load User model
const { User } = require('../../../database/model');

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
const loginUser = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  const { password } = req.body;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          performer: user.performer,
          zipcode: user.zipcode,
          photo: user.photo,
          bio: user.bio,
          followers: user.followers,
          cashappURL: user.cashappURL,
        };

        const currentDate = new Date();
        const twentyMinutes = new Date(currentDate.getTime() + (20 * 60 * 1000));
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          },
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
};

module.exports = {
  loginUser,
};
