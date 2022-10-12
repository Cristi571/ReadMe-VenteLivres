const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pwRules = require('../security/password');
const { Validator } = require('node-input-validator');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
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
                    .then(() => res.status(201).json({ message: 'User account created'}))
                    .catch(() => res.status(500).json({ error: 'Internal server error: '}));
                })
                .catch(() => res.status(500).json({ error: 'Internal server error: '}));
            } else {
                throw 'Invalid password';
            }
        }
    })
    .catch(() => res.status(500).json({ error: 'Internal server error: '}))


}