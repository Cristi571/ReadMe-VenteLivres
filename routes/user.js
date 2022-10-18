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
router.post('/users/login', userCtr.loginUser);

// Check data and destroy the user session
router.post('/users/logout', auth, userCtr.logoutUser);

// Update user data
router.put('/users/:id/update', auth, userCtr.update);

// Delete an user account and all the data associated to it
router.delete('/users/:id/delete', userCtr.deleteUser);


module.exports = router;



