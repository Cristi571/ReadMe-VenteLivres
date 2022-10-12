// Require dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


// Get the configuration data and credentials
const credentials = {
    user: process.env.DB_User, 
    password: process.env.DB_Pass, 
    project: process.env.DB_Proj, 
    database: process.env.DB_Clust}
// Set the database connexion URI 
const origin = `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.database}.752zzu4.mongodb.net/?retryWrites=true&w=majority`;

// Initialize the application with express
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(origin, { useNewUrlParser: true, useUnifiedTopology: true})
    // Connexion ok
    .then(() => console.log('Connected to MongoDB'))
    // Connexion to DB failed : Show message
    .catch( err => {
        console.error('Connexion to MongoDB failed');
        console.log(err);
    })

// CORS
app.use((req, res, next) => {

    // Set the Origin header
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Set the allowed headers
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Set allowed methods
    res.setHeader('Access-Control-Allow-Methods',
        'GET', 'POST', 'PUT', 'DELETE');
    next();
})


app.use('/api/users', userRoutes);

// Export the application
module.exports = app;