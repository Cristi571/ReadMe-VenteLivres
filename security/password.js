const passwordValidator = require('password-validator');

const pwShema = new passwordValidator();

pwShema
.is().min(6)
.is().max(16)
.has().uppercase()
.has().lowercase()
.has().letters()
.has().digits()
.has().not().spaces()
.has().not().symbols()
.is().not().oneOf(['PassW0rd', 'Password123' ])

module.exports = pwShema;
