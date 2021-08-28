const express = require('expreess');

const { user, map, schedule } = require('../controllers');

const router = express.Router();

router.get('/user', user.get);
router.post('/user', user.post.userPost);
router.post('/user/auth', user.post.authPost);

module.exports = router;
