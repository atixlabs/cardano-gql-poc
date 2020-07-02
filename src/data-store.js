const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'The Final Empire',
        author: 'Brandom Sanderson',
    },
];

const users = [
    {
        id: 1,
        name: 'Tomas Najun',
        role: 'admin',
        email: 'tnajun@atixlabs.com',
        password: 'password',
        reqestsCount: 0,

    },
    {
        id: 2,
        name: 'John Doe',
        role: '',
        email: 'jdoe@atixlabs.com',
        password: 'password',
        reqestsCount: 0,

    }
];

module.exports = { books, users };
