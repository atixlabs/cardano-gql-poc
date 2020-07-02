const jwt = require('express-jwt');

// authentication middleware
const authMiddleware = jwt({
    secret: 'somesuperdupersecret',
    credentialsRequired: false,
    algorithms: ['HS256']
});

module.exports = { authMiddleware };