
/*  */
module.exports = (req, res, next) => {
    try {
        if (!req.session.userId) {
            next()
        } else {
            res.status(403).json({ 
                message: 'Forbidden. Already connected.'
            })
        }
    } catch (error) {
        res.status(401).json({ 
            error : error | 'Something went wrong',
            message : ""
        });
    }
};