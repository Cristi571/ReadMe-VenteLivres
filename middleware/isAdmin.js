
/* Check if the connected user has admin privileges */
module.exports = (req, res, next) => {
    try {
        if (req.session.isAdmin) {
            if (req.session.isAdmin === true) {
                next();
            }
        } else {
            res.status(403).json({
                error : "Forbidden",
                message: "Access denied, you don't have permission to access this ressource.",
                code: 403
            })
        }
    } catch (error) {
        res.status(401).json({ 
            error : error | 'Something went wrong',
            message : "User session failed, please refresh the page or try to reconnect."
        });
    }
};