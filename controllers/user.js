
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
            res.status(400).send(validInput.errors);
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
    .catch(() => res.status(400).send(validInput.errors));
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.logUser = (req, res, next) => {    
    // Prepare the input data validation
    const validInput = new Validator(req.body, {
        email: 'required|email|length:100',
        password: 'required'
    });

    // Check the input data from the frontend
    validInput.check()
    .then((matched) => {
        // If input is not safe, handle the error
        if (!matched) {
            res.status(400).send(validInput.errors);
        } else {
            // If the input is safe, use the email to check if a user account exists
            User.findOne({ email : req.body.email })
            .then((user)=>{
                // If user doesn't exist, handle the error in a safe way
                if (!user) {
                    res.status(404).json({ error: "User not found"});
                    res.send("No user account with this e-mail."+
                        "<a href='#'>Sign-up now!</a>");
                } else {
                    // If user exists, compare the input password and the password stored in database
                    // You will need a bcrypt method called .compare()
                    bcrypt.compare(req.body.password, user.password)
                    .then((matched) => {
                        // If input password is incorrect, handle the error in a safe way
                        if (!matched) {
                            res.status(401).json({ message: "Incorrect password" });
                        } else {

                            res.status(200).json({
                                message: "Password matched"
                            });
                        }
                    })
                    // Catch bcrypt error
                    .catch((err) => {
                        res.status(500).json({
                            message: "Server internal error",
                            error: err
                        });
                    });
                }
            })
            // Catch mongoose error
            .catch((err) => {
                res.status(500).json({ error: err});
            })
        }
    })
    // Catch input validator error
    .catch(() => res.status(400).send(validInput.errors));
};


/**
 *  Find all user accounts in database
 * @param {*} res 
 * @return : Array | List of {user}
 */
exports.getAllUsers  = (req, res, next) => {
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
            error: "Server internal error",
            message: err.message
        })
    })
}


/**
 * Collect data of an user account from DB by the given ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getUser = (req, res, next) => {
    let userId = "634673def8b680ab391565cc";
    let owner = false;
    // Check if the logged user is the owner of the requested account
    if (owner) {
        // Return the user account data
        User.findOne({userId: userId})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "No user data"});
                return null;
            } else {
                res.status(200).json({
                    message: "Successful1",
                    user: user
                });
                return user;
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                error: "Server internal error",
                message: err
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
                    message: "Successful2",
                    user: user
                });
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                error: "Server internal error",
                message: err
            })
        })
    }
};




exports.update = (req, res, next) => {
    const validInput = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    validInput.check()
    .then((matched) => {
        if (!matched) {
            res.status(400).send(validInput.errors);
        } else {
            if (pwRules.validate(req.body.password)) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newId = new mongoose.Types.ObjectId();
                    const user = new User({
                        userId: newId,
                        email: req.body.email,
                        password: hash,
                        isAdmin: false
                    });
                    user.save()
                    .then(() => res.status(201).json({ 
                        message: 'User account created successfully.'
                    }))
                    .catch(() => res.status(500).json({ 
                        error: `An account with e-mail [${req.body.email}] already exists.`
                    }));
                })
                .catch(() => res.status(500).json({ error: 'Internal server error: '}));
            } else {
                throw 'Invalid password';
            }
        }
    })
    .catch(() => res.status(500).json({ error: 'Input fields not validated'}))


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
                        error: "Server internal error",
                        message: "An error occured while deleting account, please try again laiter..",
                        details: err
                    });
                })
            
            // Handle the error
            } else {
                res.status(400).json({
                    message: "Unauthorized access"
                });            
            }
        }
    })
    
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            error: "Server internal error",
            message: err
        })
    })
};