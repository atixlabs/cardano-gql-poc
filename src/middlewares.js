const jwt = require('express-jwt');
const { users } = require('./data-store');

// authentication middleware
const authMiddleware = jwt({
    secret: 'somesuperdupersecret',
    credentialsRequired: false,
    algorithms: ['HS256']
});

const requestLimitValidation = (req, res, next) => {
    const { user } = req;

    if(!user) {
        // TODO may be public endpoints. It will be fixed in version 2
        next();
        return;
    }

    const ourUser = users.find(aUser => user.id === aUser.id);

    // TODO skip validations if endpoint is free  
    if (!ourUser) {
        res.status(403).send('No api key provided');
        return;
    }

    if (ourUser.reqestsCount >= 5) {
        res.status(429).send('Too many requests');
        return;
    }

    ourUser.reqestsCount = ourUser.reqestsCount + 1;

    console.log(`User id: ${ourUser.id} did ${ourUser.reqestsCount} requests`);

    next();
};

module.exports = { authMiddleware, requestLimitValidation };