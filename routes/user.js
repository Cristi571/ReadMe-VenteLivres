const express = require('express');
const userCtr = require('../controllers/user');
const auth = require('../middleware/auth')

const router = express.Router();

// Get all users from DB
router.get('/users', userCtr.getAllUsers);

// Create new user account
router.post('/users/signup', userCtr.createUser);

// Get data of a single user
router.get('/users/:id', userCtr.getUser);

// Check data and start an user session
router.post('/users/login', userCtr.logUser);

// Update user data
router.put('/users/update', userCtr.update);

// Delete an user account and all the data associated to it
router.delete('/users/delete/:id', userCtr.deleteUser);


module.exports = router;