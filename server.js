// Require dependencies
const http = require('http');
const app = require('./app');

// Set/Determine the server port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


const port = normalizePort(process.env.PORT || '3001')
app.set('port', port);

// handle errors
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? 'pipe' + address : 'port' + port;

    // Setting some personalized error codes/messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'require elevate privileges.');
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            break;
    
        default:
            throw error;
    }
}


// Initialize the server
const server = http.createServer(app);
// Sets the error handler
server.on('error', errorHandler);
// Sets the listening port for the server
server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
        console.log('Listening on ' + bind);
    }
)
// Starts the server on the given port
server.listen(port);