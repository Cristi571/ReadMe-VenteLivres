const express = require('express');
const userCtr = require('../controllers/user');
const auth = require('../middleware/auth');
const isConnect = require('../middleware/isConnect');
const isDisconn = require('../middleware/isDisconn');
const isAdminMDLW = require('../middleware/isAdmin');
const isOwner = require('../middleware/isOwner');

const router = express.Router();
// Get all users from DB 
// only admin | only connected
router.get('/users', auth, isConnect, isAdminMDLW, userCtr.getAllUsers);

// Get data of a single user
// owner & admin | only connected
router.get('/users/:id', auth, isConnect, userCtr.getUser);

// Create new user account
// everyone | only disconnected
router.post('/users/signup', isDisconn, userCtr.createUser);

// Check data and start an user session
// everyone | only disconnected
router.post('/users/login', isDisconn, userCtr.loginUser);

// Check data and destroy the user session
// owner | only connected
router.post('/users/logout', auth, isConnect, userCtr.logoutUser);

// Update user data
// owner & admin | only connected
router.put('/users/:id/update', auth, isConnect, userCtr.update);

// Delete an user account and all the data associated to it
// owner | only connected
router.delete('/users/:id/delete', auth, isConnect, isOwner, userCtr.deleteUser);


module.exports = router;



