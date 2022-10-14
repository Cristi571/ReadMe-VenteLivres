// Require dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

// Initialize the application with express
const app = express();
app.use(express.json());


// Prepare the configuration data and credentials
const credentials = {
    user: process.env.DB_User, 
    password: process.env.DB_Pass, 
    project: process.env.DB_Proj, 
    database: process.env.DB_Clust
}


/**
 * Initial database connexion
 */
// Set the database connexion URI 
const origin = `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.database}.752zzu4.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB
var dbWait = true;
//var animFrames = ["\\ \\ \\", "| | |", "/ / /", "- - -"];
var animFrames = ["\\ | /", "\\ | /", "\\ | / - - -"];
mongoose.connect(origin, { useNewUrlParser: true, useUnifiedTopology: true})
// Connexion ok
.then(() => {
    dbWait = false
    clearInterval(twirlTimer)
    animFrames = ["", "", "", ""];
    console.log('Connected to MongoDB')
})
// Connexion to DB failed : Show message
.catch( err => {
    dbWait = false
    clearInterval(twirlTimer)
    animFrames = ["", "", "", ""];
    console.error('Connexion to MongoDB failed');
    console.log(`Error details : ${err}`);
})
if (dbWait === true) {
    console.log('Establishing database connection ..')
    console.log('Please wait')
    var twirlTimer = (() => {
        var x = 0;
        return setInterval(function() {
        process.stdout.write("\r" + animFrames[x++]);
        x &= 3;
        }, 200);
    })();
}


const db = mongoose.connection
db.on('Error', (error) => console.error(error))
db.once('Open', () => console.log('Connected to Database'))

/** */




// CORPS
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

// Set the root of the user routes
app.use('/api', userRoutes);

// Export the application
module.exports = app;