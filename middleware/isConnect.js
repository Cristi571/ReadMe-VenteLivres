
/*  */
module.exports = (req, res, next) => {
    try {
        if (!req.session.userId) {
            res.status(403).json({ 
                message: 'Need to login to access this ressource.' 
            })
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ 
            error : error | 'Something went wrong',
            message : "User session failed"
        });
    }
};