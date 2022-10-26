const express = require('express');
const bookCtr = require('../controllers/book');
const auth = require('../middleware/auth')
const isConnect = require('../middleware/isConnect');
const isAdminMDLW = require('../middleware/isAdmin');


const router = express.Router();

// Add new book
// Use auth middleware to check if user is connected 
// and has privileges to add new books
router.post('/books/create', auth, isConnect, isAdminMDLW, bookCtr.create);

// Get all books
// Everyone can access
router.get('/books', bookCtr.getAllBooks);

// Get one book by id
// Everyone can access
router.get('/books/:id', bookCtr.getBook);

// Update one book by id
// Use auth middleware to check if user is connected 
// and has privileges to update book's data
router.put('/books/:id/update', auth, isConnect, isAdminMDLW, bookCtr.update);

// Delete one book by id
// Use auth middleware to check if user is connected 
// and has privileges to delete books
router.delete('/books/:id/delete', auth, isConnect, isAdminMDLW, bookCtr.delete);

module.exports = router;