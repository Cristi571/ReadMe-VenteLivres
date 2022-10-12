
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












