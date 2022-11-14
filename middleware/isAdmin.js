

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Check if the connected user has admin privileges
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        User.findOne({userId: decodeToken.userId})
        .then((user) => {
            if (!user) {
                res.status(403).json({
                    error : "Forbidden",
                    message: "Access denied, you don't have permission to access this ressource.",
                    code: 403
                })
            } else {
                
                if(user.isAdmin === true) {
                    console.log("Access approved for admin")
                    next();
                } else {
                    console.log("Access forbidden : only admin")
                    res.status(403).json({
                        error : "Forbidden",
                        message: "Access denied, you don't have permission to access this ressource.",
                        code: 403
                    })
                }
            }
        })
        // Catch mongoose error
        .catch((err) => {
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