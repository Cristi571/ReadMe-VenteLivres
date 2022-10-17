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


var dbConnect = (() => {
    // Prepare the message to show for this animation
    var animMessage = "Establishing database connection"
    // Preparing console animation frames
    var animFrames = [
        " [.  ]", 
        " [.. ]", " [...]", " [ ..]", 
        " [  .]", 
        " [ ..]", " [...]", " [.. ]"
    ];
    
    // Prepare the animation behavior and start it
    var consoleLoadingAnimation = (() => {
        var x = 0;
        return setInterval(() => {
            (x === animFrames.length) ? x = 0 : x
            process.stdout.write("\r" + animMessage + 
                animFrames[x]
            )
            x++
            //x &= 4;
        }, 300)
    })()

    var stopConsoleAnimation = (() => {
        // Stop the animation
        clearInterval(consoleLoadingAnimation)
        // Clear the animation console line
        process.stdout.clearLine()
        // Return console cursor to initial position
        process.stdout.cursorTo(0)
    })


    mongoose.connect(origin, { useNewUrlParser: true, useUnifiedTopology: true})
    // If DB connexion is successful
    .then(() => {
        // Set a 1s min time to the animation
        setTimeout(()=>{
            stopConsoleAnimation()
            // Show a custom message to the user
            console.log('Connected to MongoDB')  
        }, 1000)
    })
    // If some error occurs while connecting to DB
    .catch( err => {
        // Set a 1s min time to the animation
        setTimeout(()=>{
            stopConsoleAnimation()
            // Show a custom error message
            console.error('Connexion to MongoDB failed');
            // Show actual system error details for debbuging
            console.log(`Error details : ${err}`);
        }, 1000)
    })

})()





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