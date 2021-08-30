const express = require('express');

const { user, map, schedule } = require('../controllers');
const { loginUser } = require('./AuthAPI/login');
const { registerUser } = require('./AuthAPI/register');

const router = express.Router();

<<<<<<< HEAD
router.get('/user', user.get);
// router.post('/user', user.post.userPost);
// router.post('/user/auth', user.post.authPost);
=======
// router.get('/user', user.get);
router.post('/login', loginUser);
router.post('/register', registerUser);
>>>>>>> 25fadb8ee9408630f02ddb41eb6b21b885c53a04

module.exports = router;
