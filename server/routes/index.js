const express = require('express');

const { user, map, schedule } = require('../controllers');
const { loginUser } = require('./AuthAPI/login');
const { registerUser } = require('./AuthAPI/register');

const router = express.Router();

// router.get('/user', user.get);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
