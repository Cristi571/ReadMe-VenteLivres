

module.exports = (req, res, next) => {
    if(!localStorage.getItem('token_session')) {
        window.location.replace("http://www.w3schools.com");
    }
    // next();
}