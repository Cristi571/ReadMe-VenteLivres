

// Check if a user local session is running and allows user to access this route
module.exports = (req, res, next) => {
    if(!localStorage.getItem('sess_token')) {
        // Go to the login page
        window.location.replace("/login");
    }
    // Stay on this route since the user is authenticated
    next();
}