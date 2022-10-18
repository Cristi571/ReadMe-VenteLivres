

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
    bookId: { 
        type: mongoose.Types.ObjectId, 
        required: true, 
        unique: true },
    title: { 
        type: String, 
        required: true},
    // The full name of the author
    // Better use Array type if books could have multiple authors
    authors: {
        type: String, 
        required: true },
    // The standard price of the book
    price: { 
        type: String, 
        required: true },
    // Internation Standard Book Number
    isbn: { 
        type: String, 
        required: true, 
        unique: true },
    // The number of the pages
    pages: { 
        type: Number },
    // The initial/actual stock quantity
    stock: { 
        type: Number }
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);