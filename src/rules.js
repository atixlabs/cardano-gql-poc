const { rule, shield, and, or, not } = require('graphql-shield');

const { users } = require('./data-store');

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        console.log('user', ctx.user);
        console.log('bool', ctx.user !== null);
        return ctx.user !== null
    },
);

const isPublic = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => true
);

const hasReachedQuota = rule({ cache: 'no_cache' })(
    async (parent, args, ctx, info) => {
        console.log('hasReachedQuota');
        const { user: authUser } = ctx;
        const ourUser = users.find(aUser => authUser.id === aUser.id);

        if (!ourUser) {
            return new Error('No api key provided');
        }
    
        if (ourUser.reqestsCount >= 5) {
            return new Error('Too many requests');
        }

        ourUser.reqestsCount = ourUser.reqestsCount + 1;

        console.log(`User id: ${ourUser.id} did ${ourUser.reqestsCount} requests`);
        return true;
    }
);

// Permissions

const permissionsMiddleWare = shield({
    Query: {
        users: and(isAuthenticated, hasReachedQuota),
        books: isPublic,
    },
    Mutation: {
        login: not(isAuthenticated),
    }
});

module.exports = { permissionsMiddleWare };