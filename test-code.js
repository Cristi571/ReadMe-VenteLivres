
// Installer jsonwebtoken dans le projet avec la commande npm install --save jsonwebtoken

// Importer jsonwebtoken et l'assigner à une constante en haut du fichier ⬆️⬆️⬆️

const jwt = require('jsonwebtoken');

// Générer un nouveau token with .sign(payload, secret_key, options) 

res.status(200).json({ 
    userId: user.userId, 
    token: jwt.sign(
        { 
            userId: user.userId, 
            isAdmin: user.isAdmin 
        },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
    ),
    isAdmin: user.isAdmin
});












const jwt = require('jsonwebtoken');

/* take token from request header, compare the client userId and the token userId */
module.exports = (req, res, next) => {
    try {

        // header dans la requete ==> authorization : 'Bearer xxxxxxxxx';
        
        // Extraire le token de l'entête
        const token = req.headers.authorization.split(' ')[1];

        // Vérifier le token
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        // Assigner l'id aux variables locales de réponse
        const userId = decodeToken.userId;
        res.locals.userId = userId;
        next();

    } catch (error) {
        res.status(401).json({ error : error | 'Authentification failed !'});
    }
};



























exports.getUser = (req, res, next) => {
    console.log("Start")
    // console.log(res.locals.userId)
    // If the request userId is the same as the session userId
    // then the request is sent by the owner of the account
    
    // async function checkUserIsAdmin() {
    //     User.findOne({userId: decodeToken.userId})
    //     .then((user) => {
    //         if (!user) {
    //             res.status(403).json({
    //                 error : "Forbidden",
    //                 message: "Access denied, you don't have permission to access this ressource.",
    //                 code: 403
    //             })
    //             return new Promise(false);
    //         } else {
    //             return new Promise(resolve => {resolve(user.isAdmin)})
    //         }
    //     }) 
    //     // Catch mongoose error
    //     .catch((err) => {
    //         res.status(500).json({
    //             message: "Internal server error",
    //             error : err
    //         });
    //         return new Promise(false);
    //     })
    // }

    // const isAdmin = await checkUserIsAdmin();
    // console.log(isAdmin);

    // function checkUserIsAdmin() {
    //     return new Promise(resolve => {
    //         User.findOne({userId: decodeToken.userId})
    //         .then((user) => {
    //             if (!user) {
    //                 res.status(403).json({
    //                     error : "Forbidden",
    //                     message: "Access denied, you don't have permission to access this ressource.",
    //                     code: 403
    //                 })
    //                 resolve(false);
    //             } else {
    //                 resolve(user.isAdmin);
    //                 getCompleteUserData();
    //             }
    //         })
    //         // Catch mongoose error
    //         .catch((err) => {
    //             res.status(500).json({
    //                 message: "Internal server error",
    //                 error : err
    //             });
    //             resolve(false);
    //         })
    //     });
    // }
    // var result = 0;
    // async function asyncCall() {
    //     result = await checkUserIsAdmin();
    //     console.log('isAdmin : ' + result);
    // }
    // asyncCall();

    // console.log("result: ", result)
    // console.log("owner : ", isOwner);




    // Check if the logged user is the owner of the requested account
    function getCompleteUserData() {
        // Return the user account data
        User.findOne({userId: req.params.id})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "No user data"});
                return null;
            } else {
                // Owner data access
                let userData = {
                    email : user.email,
                    lastname : user.lastname,
                    firstname : user.firstname,
                }
                if (admin) {
                    userData.isAdmin = user.isAdmin
                }
                res.status(200).json({
                    message: "user data",
                    data: userData
                });
                return user;
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                code : 105,
                error: err,
            })
        })
    }
    
    function getLimitedUserData() {
        // Use the request parameters to find the user account

        // Return the user account data in a way that respect its privacy
        User.findOne({userId: req.params.id})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "No user data"});
            } else {
                res.status(200).json({
                    message: "Successful",
                    user: user
                });
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                code : 106,
                error: err,
            })
        })
    }


    // Check if connected user has admin privileges
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // Check if connected user is the owner of the requested data account
    var isOwner = (req.params.id === decodeToken.userId);
    if (isOwner === true) {
        getCompleteUserData();
    } else {
        // Check if the connected user has admin privileges
        User.findOne({userId: decodeToken.userId})
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    error : "Forbidden",
                    message: "No user data found",
                    code: 404
                })
            } else {
                if (user.isAdmin === true) {
                    getCompleteUserData();
                } else {
                    res.status(403).json({
                        error : "Forbidden",
                        message: "Access denied, you don't have permission to access this ressource.",
                        code: 403
                    })
                }
            }
        })
        // Catch mongoose error
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                error : err
            });
        })
    }

};