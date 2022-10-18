
// Import node dependencies
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v1: uuidv1, v4: uuidv4,} = require('uuid');
// Generate a v1 (time-based) id
// uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
// Generate a v4 (random) id
// uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Import dependencies from files
const Book = require('../models/book');
const User = require('../models/user');



// Add new book - ok
exports.create = (req, res, next) => {
    console.log("reqBody : %o", req.body)
    // Get session user data by id
    User.findOne({userId: res.locals.userId})
    .then((user) => {
        if (!user) {
            res.status(404).json({
                message: "Something went wrong"
            });
        } else {
            // Check if the user has admin privileges
            let userIsAdmin = user.isAdmin;
            console.log("user is admin : " + userIsAdmin);
            if (userIsAdmin === true) {
                console.log("Access allowed, you have admin privileges")
                // Prepare the input data validation
                const validInput = new Validator(req.body, {
                    title: 'required|string|maxLength:350',
                    authors: 'required|string|maxLength:300',
                    price: 'required|string|maxLength:8',
                    pages: 'integer|maxLength:12',
                    stock: 'integer|maxLength:12',
                });
        
                // Check the input data from the frontend
                validInput.check()
                .then((matched) => {
                    if (!matched) {
                        res.status(400).json({
                            message : "Invalid input(s)",
                            error : validInput.errors,
                        });
                    } else {
                        // If inputs ok
                        
                        const newBookId = new mongoose.Types.ObjectId();
                        // Generate new ISBN
                        const newISBN = uuidv4();

                        // Prepare all the book data for storage
                        const book = new Book({
                            bookId: newBookId,
                            title: req.body.title,
                            authors: req.body.authors,
                            price: req.body.price,
                            isbn: newISBN,
                            pages: req.body.pages,
                            stock: req.body.stock,
                        });
                        // Save the book data in the database
                        book.save()
                        .then(() => res.status(201).json({ 
                            message: 'New book added successfully.',
                            book : book
                        }))
                        .catch((e) => res.status(500).json({ 
                            error: e.message,
                            book : book
                        }));
                    }
                })
                .catch((e) => res.status(400).json({
                    message: "Server internal error",
                    code : 202,
                    error: validInput,
                    e:e,
                }));
                
        
            } else {
                console.log("Access denied, you don't have permission to access this route")
            }
        }
    })
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            message: "Server internal error",
            code : 203,
            error: err,
        })
    })
}


// Get all books
exports.getAllBooks = (req, res, next) => {
    // You will need a mongoose method called .find()
    Book.find()
    // Return book accounts data in a way that respects their privacy
    .then((books)=>{
        console.log('books : |' + books + '|')
        console.log('books : ' + typeof books)

        if (!books || books == null) {
            res.status(404).json({
                message: "No book found"
            })
        } else {
            res.status(200).json({
                message: "Successful",
                books: books
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "Server internal error",
            code : 201,
            error: err,
        })
    })
}


// Get one book by id
exports.getBook = (req, res, next) => {

}


// Update one book by id
exports.update = (req, res, next) => {

}

// Delete one book by id
exports.delete = (req, res, next) => {
    let canDelete = true;
    User.findOne({userId: res.locals.userId})
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
}