
// Import node dependencies
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import dependencies from files
const pwRules = require('../security/password');
const User = require('../models/user');


/**
 * This method is used for creating and adding a new user to the DB
 * @param {*} req - the request
 * @param {*} res - the result of the request
 * @param {*} next - 
 */
 exports.createUser = (req, res, next) => {
    // Prepare the input data validation
    const validInput = new Validator(req.body, {
        email: 'required|email|length:100',
        password: 'required',
        lastname: 'required|string|length:100',
        firstname: 'required|string|length:100'
    });
    
    // Check the input data from the frontend
    validInput.check()
    .then((matched) => {

        // If input is not safe, handle the error
        if (!matched) {
            res.status(400).json({
                error : validInput.errors
            });
        } else {

            // If the input is safe, check the password strengh
            if (pwRules.validate(req.body.password)) {

                // Hash the password
                bcrypt.hash(req.body.password, 10)
                .then(hash => {

                    // Format the user data for storage
                    const newId = new mongoose.Types.ObjectId();
                    const user = new User({
                        userId: newId,
                        email: req.body.email,
                        password: hash,
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                        isAdmin: false
                    });
                    
                    // Store the user data in the database
                    user.save()
                    .then(() => res.status(201).json({ message: 'User account created successfully.' }))
                    .catch((e) => res.status(500).json({ error: e.message }));
                })
                .catch(() => res.status(500).json({ error: "Internal servor error:2" }));
            } else {
                throw 'Invalid password';
            }
        }
    })
    .catch(() => res.status(400).json({
        error : validInput.errors
    }));
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.loginUser = (req, res, next) => {    
    // Prepare the input data validation
    const validInput = new Validator(req.body, {
        email: 'required|email|length:100',
        password: 'required|string'
    });

    // Check the input data from the frontend
    validInput.check()
    .then((matched) => {
        // If input is not safe, handle the error
        if (!matched) {
            res.status(400).json({
                error : validInput.errors
            });
        } else {
            // If the input is safe, use the email to check if a user account exists
            User.findOne({ email : req.body.email })
            .then((user)=>{
                // If user doesn't exist, handle the error in a safe way
                if (!user) {
                    res.status(404).json({ errorMail: "User not found"});
                } else {
                    // If user exists, compare the input password and the password stored in database
                    // You will need a bcrypt method called .compare()
                    bcrypt.compare(req.body.password, user.password)
                    .then((matched) => {
                        // If input password is incorrect, handle the error in a safe way
                        if (!matched) {
                            res.status(401).json({ message: "Incorrect password" });
                        } else {
                            req.session.userId = user.userId;
                            req.session.isAdmin = user.isAdmin;
                            res.status(200).json({
                                userId: user.userId,
                                // Gives a token to the user
                                token: jwt.sign({ userId: user.userId },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    // Catch bcrypt error
                    .catch((err) => {
                        res.status(500).json({
                            message: "Server internal error",
                            code : 101,
                            error: err
                        });
                    });
                }
            })
            // Catch mongoose error
            .catch((err) => {
                res.status(500).json({ 
                    message: "Server internal error",
                    code : 102,
                    error: err
                });
            })
        }
    })
    // Catch input validator error
    .catch(() => res.status(400).json({
        message: "Server internal error",
        code : 103,
        error: validInput.errors
    }));
};


/*
*/
exports.logoutUser = (req, res, next) => {
    console.log("jwt : %o", jwt)

    req.session.destroy()
    .then(
        res.status(200).json({
            message: "User logged out",
        })
    )
    .catch((err)=>{
        res.status(500).json({
            error: err
        })
    });
    /*
    jwt.destroy(token)
    .then((destr)=>{
        
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        })
    });
    */
    
}




/**
 *  Find all user accounts in database
 * @param {*} res 
 * @return : Array | List of {user}
 */
exports.getAllUsers  = (req, res, next) => {
    if (req.session.isAdmin) {
        // You will need a mongoose method called .find()
        User.find()
        // Return user accounts data in a way that respects their privacy
        .then((users)=>{
            if (!users) {
                res.status(404).json({
                    message: "No user found"
                })
            } else {
                res.status(200).json({
                    message: "Successful",
                    users: users
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Server internal error",
                code : 104,
                error: err.message,
            })
        })
    } else {
        res.status(403).json({
            error : "Forbidden",
            message: "Access denied, you don't have permission to access this ressource.",
            code: 403
        })
    }
    
}


/**
 * Collect data of an user account from DB by the given ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getUser = (req, res, next) => {
    console.log(req.session)
    // If the request userId is the same as the session userId
    // then the request is sent by the owner of the account
    let owner = (req.params.id === req.session.userId);
    let admin = false;
    // Check if the connected user has admin privileges
    User.findOne({userId: req.session.userId})
    .then((user) => {
        if (!user) {
            admin = false;
        } else {
            admin = user.isAdmin;
        }
    })
    // Catch mongoose error
    .catch((err) => {
        console.error("Can't get user by id");
        admin = false;
    })
    // Check if the logged user is the owner of the requested account
    if (owner || admin) {
        // Return the user account data
        User.findOne({userId: req.params.id})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "No user data"});
                return null;
            } else {
                // Owner data access
                let userData = {
                    email : user.email,
                    lastname : user.lastname,
                    firstname : user.firstname,
                }
                if (admin) {
                    userData.isAdmin = user.isAdmin
                }
                res.status(200).json({
                    message: "user data",
                    data: userData
                });
                return user;
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                code : 105,
                error: err,
            })
        })
    } else {
        // Use the request parameters to find the user account

        // Return the user account data in a way that respect its privacy
        User.findOne({userId: req.params.id})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "No user data"});
            } else {
                res.status(200).json({
                    message: "Successful",
                    user: user
                });
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                code : 106,
                error: err,
            })
        })
    }
};


exports.update = (req, res) => {

    const validInput = new Validator (req.body, {
        email: "email|length:200",
        firstname: "string|length:150",
        lastname: "string|length:150",
        isAdmin: "boolean"
    });

    
    validInput.check()
    .then((matched) =>{
        if(!matched) {
            res.status(400).json({
                message : "Invalid inputs",
                error:validInput.errors
            });
        } else {
            // Vérifie si le mot de passe doit être modifié
            if (req.body.password !== undefined) {
                // Check if the new password fits the validation rules
                if (pwRules.validate(req.body.password)) {
                    // Hash the password
                    console.log("password : " + req.body.password)
                    bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        setUserData(hash)
                    })
                    .catch((e) => {
                        res.status(500).json({
                            message : "Server internal error1",
                            error : e
                        })
                    })
                } else {
                    res.status(400).json({
                        message : "Invalid password",
                        error : validInput.errors
                    });
                    throw 'Invalid password';
                }
            } else {
                // Check if the connected user is sending the request
                if (req.params.id === req.session.userId) {
                    // Get the user data from db
                    User.findOne({userId: req.params.id})
                    .then((user) => {
                        if (!user) {
                            res.status(404).json({message: "No user data"});
                            return null;
                        } else {
                            setUserData(user.password)
                            return user;
                        }
                    })
                    // Catch mongoose findOne error
                    .catch((err) => {
                        res.status(500).json({
                            message : "Server internal error2",
                            code : 109,
                            error : err,
                        })
                    })
                }
                
            }
            
            function setUserData(newPass) {
                // If password validator ok
                const user = req.body
                user.password = newPass;
                User.findOneAndUpdate({userId: req.params.id}, {...req.body})
                .then((utd) => {
                    if (!utd) {
                        res.status(500).json({
                            message: 'User update failed!',
                            userId: req.params.id,
                            e: e,
                            user: user
                        })
                    } else {
                        res.status(200).json({ 
                            message:"User updated successfully",
                            user: user
                        })
                    }
                })
                .catch((err) => res.status(500).json({
                    message: 'Internal server error2',
                    error : err
                }))
            }
            
        }
    })
    .catch((err) => res.status(500).json({
        message: 'Input validation failed',
        error : validInput.errors
    }));
    

}



exports.deleteUser = (req, res, next) => {
    let canDelete = true;
    User.findOne({userId: req.params.id})
    .then((user) => {
        // If the user account doesn't exists, handle the error
        if (!user) {
            res.status(404).json({message: "This account does not exist"});
        } else {
            // Check if the user is authorized to delete the account
            if (user.isAdmin === true || canDelete === true) {
                // Delete the account
                // You will need a mongoose method called .deleteOne()
                User.deleteOne()
                .then(() => {
                    res.status(400).json({
                        message: "Account deleted successfully",
                    });
                })
                
                // Catch mongoose error
                .catch((err) => {
                    res.status(400).json({
                        message: "Server internal error",
                        code : 107,
                        error: err,
                    });
                })
            
            // Handle the error
            } else {
                res.status(400).json({
                    message: "Unauthorized access",
                    code : 108,
                });            
            }
        }
    })
    
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            message: "Server internal error",
            code : 109,
            error: err,
        })
    })
};