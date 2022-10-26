
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
            //console.log("user is admin : " + userIsAdmin);
            if (userIsAdmin === true) {
                console.log("Access allowed, you have admin privileges")
                // Prepare the input data validation
                const validInput = new Validator(req.body, {
                    title: 'required|string|maxLength:350',
                    authors: 'required|string|maxLength:300',
                    price: 'required|string|maxLength:8',
                    pages: 'integer|maxLength:12',
                    stock: 'integer|maxLength:12',
                    volume: 'string|maxLength:360',
                    ctg: 'array',
                    publication: 'string',
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
                            volume: req.body.volume,
                            ctg: req.body.ctg,
                            publication: req.body.publication,
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
                .catch((err) => res.status(400).json({
                    message: "Internal server error",
                    code : 201,
                    error1: validInput,
                    error2: err,
                }));
            } else {
                console.log("Access denied, you don't have permission to access this route")
            }
        }
    })
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            code : 202,
            error: err,
        })
    })
}


// Get all books
exports.getAllBooks = (req, res, next) => {
    
    /** Prepare the result structuration data
     * 
     * - Results per page -
     * @limit : int | default = 10 | 
     * - Actual page to show/result set -
     * @page : int | default = 1 |
     *  - use Category params to filter results -
     * @ctg : ArrayOfObjects | default : [{}]
     */
    let { limit = 10, page = 1, ctg } = req.query;
    const limitRecords = parseInt(limit);
    const skip = (page -1) * limit;

    var queryFilter = [];
    if(ctg) {
        // Only one filter parameter
        if (typeof ctg === "string") {
            queryFilter = [ { "ctg": ctg }]
        }// Multiple filter parameters
        else if (typeof ctg === "object") {
            console.log("type ctg: ", typeof ctg);
            req.query.ctg = ctg;
            console.log("ctg: ", ctg)
            console.log("ctgLength: ", ctg.length)
            
            var obj = {};
            for (i = 0; i < ctg.length; i++) {
                obj = {"ctg": ctg[i]};
                queryFilter.push(obj);
            }
        }
        console.log("filter: ", queryFilter)
    } else {
        queryFilter = [{}];
    }

    console.log("queryFilter: ", queryFilter);

    //Book.find(query).limit(limitRecords).skip(skip)
    Book.find({$or: queryFilter})
    // Book.find({ $or: flt })
    // Return book accounts data in a way that respects their privacy
    .then((books)=>{
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
            message: "Internal server error",
            code : 203,
            error: err,
        })
    })
}


// Get one book by id
exports.getBook = (req, res, next) => {
    // Return the user account data
    Book.findOne({bookId: req.params.id})
    .then((book) => {
        if (!book) {
            res.status(404).json({
                message: "No book data",
                data: book
            });
            return null;
        } else {
            res.status(200).json({
                message: "Successful",
                data: book
            });
        }
    })
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            code : 204,
            error: err,
        })
    })
}


// Update one book by id
exports.update = (req, res, next) => {
    
    const validInput = new Validator(req.body, {
        title: 'required|string|maxLength:350',
        authors: 'required|string|maxLength:300',
        price: 'required|string|maxLength:8',
        pages: 'integer|maxLength:12',
        stock: 'integer|maxLength:12',
        volume: 'string|maxLength:360',
        publication: 'string|maxLength:360',
    });
    validInput.check()
    .then((matched) =>{
        if(!matched) {
            res.status(400).json({
                message : "Invalid inputs",
                error:validInput.errors
            });
        } else {
            Book.findOneAndUpdate({bookId: req.params.id}, {...req.body})
            .then((update) => {
                if (!update) {
                    res.status(500).json({
                        message: 'Book update failed!',
                        bookId: req.params.id,
                        e: e,
                        book: req.body
                    })
                } else {
                    res.status(200).json({ 
                        message:"Book updated successfully",
                        book: req.body,
                        update: update
                    })
                }
            })
            .catch((err) => res.status(500).json({
                message: 'Internal server error2',
                error : err
            }))
        }
    })
    // Catch validator errors
    .catch((err) => res.status(500).json({
        message: 'Internal server error',
        code: 208,
        error: err
    }));
    
}

// Delete one book by id
exports.delete = (req, res, next) => {
    let canDelete = true;
    let isAdmin = true;
    Book.findOne({bookId: req.params.id})
    .then((book) => {
        // If the user account doesn't exists, handle the error
        if (!book) {
            res.status(404).json({message: "Book not found"});
        } else {
            // Check if the user is authorized to delete the account
            if (isAdmin === true || canDelete === true) {
                // You will need a mongoose method called .deleteOne()
                Book.deleteOne()
                .then(() => {
                    res.status(400).json({
                        message: "Book deleted successfully",
                    });
                })
                // Catch mongoose error
                .catch((err) => {
                    res.status(400).json({
                        message: "Internal server error",
                        code : 205,
                        error: err,
                    });
                })
            
            // Handle the error
            } else {
                res.status(400).json({
                    message: "Access denied",
                    code : 206,
                });            
            }
        }
    })
    
    // Catch mongoose error
    .catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            code : 207,
            error: err,
        })
    })
}