const express = require('express');
const userCtr = require('../controllers/user');
const auth = require('../middleware/auth');
const isConnect = require('../middleware/isConnect');
const isDisconn = require('../middleware/isDisconn');
const isAdmin = require('../middleware/isAdmin');
const isOwner = require('../middleware/isOwner');
const isAdminOrOwner = require('../middleware/isAdminOrOwner');

const router = express.Router();
// Get all users from DB 
// only connected | only admin
router.get('/users', auth, isAdmin, userCtr.getAllUsers);

// Get data of a single user
// only connected | owner OR admin
router.get('/users/:id', auth, isAdminOrOwner, userCtr.getUser);

// Create new user account
// everyone | only disconnected
router.post('/users/signup', isDisconn, userCtr.createUser);

// Check data and start an user session
// everyone | only disconnected
router.post('/users/login', isDisconn, userCtr.loginUser);

// Check data and destroy the user session
// owner | only connected
router.post('/users/logout', auth, userCtr.logoutUser);

// Update user data
// owner & admin | only connected
router.put('/users/:id/update', auth, userCtr.update);

// Delete an user account and all the data associated to it
// owner OR admin | only connected
router.delete('/users/:id/delete', auth, isAdminOrOwner, userCtr.deleteUser);


module.exports = router;



