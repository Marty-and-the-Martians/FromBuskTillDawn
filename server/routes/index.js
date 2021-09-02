const express = require('express');

const { user, event } = require('../controllers');
const { loginUser } = require('./AuthAPI/login');
const { registerUser } = require('./AuthAPI/register');

const router = express.Router();

// router.get('/user', user.get);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/user/:userId', user.get.getUser);
router.put('/user/:userId', user.put.updateUser);
router.put('/user/:userId/:eventId', user.put.addAttendingEvent);
router.delete('/user/:userId/:eventId', user.delete.deleteEvent);

router.get('/event', event.get.getEvents);
router.get('/event/:userId', event.get.getEvents);
router.post('/event', event.post.postEvent);
router.put('/event/:eventId', event.put.updateEvent);
router.delete('/event/:eventId', event.delete.deleteEvent);

module.exports = router;
