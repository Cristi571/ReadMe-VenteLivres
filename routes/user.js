const express = require('express');
const userCtr = require('../controllers/user');

const router = express.Router();

router.post('/signup', userCtr.createUser);
// router.post('/login', userCtr.logUser);
// router.post('/logout', userCtr.decUser);


module.exports = router;