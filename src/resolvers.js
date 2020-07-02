const jsonwebtoken = require('jsonwebtoken');

const { users, books } = require('./data-store');

const login = async (_, { email, password }) => {
    const aUser = users.filter(user => user.email === email)

    if (!aUser.length) {
        throw new Error('No user with that email')
    }

    const user = aUser[0];

    const valid = password === user.password;

    if (!valid) {
        throw new Error('Incorrect password')
    }

    // return json web token
    return jsonwebtoken.sign({
        id: user.id,
        email: user.email
    }, 'somesuperdupersecret', { expiresIn: '1y' }, { algorithm: 'HS256' })
};

const getUsers = (_, args, context) => {
    // make sure user is authenticated
    if (!context.user) {
        throw new Error('You are not authorized!')
    }

    return users;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        users: getUsers
    },

    Mutation: {
        login
    }
};

module.exports = { resolvers };