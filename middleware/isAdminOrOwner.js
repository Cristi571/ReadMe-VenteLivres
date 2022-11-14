

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Check if the connected user has admin privileges
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            
        // Check if the request is made by user with admin privileges
        // Get user from DB by ID
        User.findOne({userId: decodeToken.userId})
        .then((user) => {
            // No user found with given ID
            if (!user) {
                res.locals.isAdmin = false;
                res.locals.isOwner = false;
                res.status(403).json({
                    error : "Forbidden",
                    message: "Access denied, you don't have permission to access this ressource.",
                    code: 403
                })
            } else {
                if(user.isAdmin === true) {
                    // Allow access to the ressource for the admin
                    res.locals.isAdmin = true;
                    res.locals.isOwner = false;
                    next();
                } else {
                    // Check if the connected user is the owner of the account
                    if (req.params.id === res.locals.userId) {
                        res.locals.isAdmin = false;
                        res.locals.isOwner = true;
                        // Allow access to the ressource for the owner
                        next();
                    } else {
                        console.log("Access forbidden")
                        res.locals.isAdmin = false;
                        res.locals.isOwner = false;
                        res.status(403).json({
                            error : "Forbidden",
                            message: "Access denied, you don't have permission to access this ressource.",
                            code: 403
                        })
                    }
                }
            }
        })


        // Catch mongoose error
        .catch((err) => {
            res.locals.isAdmin = false;
            res.locals.isOwner = false;
            res.status(500).json({
                message: "Internal server error",
                error : err
            });
        })


    } catch (error) {
        res.status(401).json({ 
            error : error | 'Something went wrong',
            message : "User session failed, please refresh the page or try to reconnect."
        });
    }
};