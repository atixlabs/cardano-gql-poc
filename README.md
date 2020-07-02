# POC GraphQL Authentication, Authorization and request limiting

This is a proof of concept of authentication, authorization and request limiting by api key or user using GraphQL Apollo server. 

## Install

- `nvm use`
- `npm install`
- `npm start`

The app runs in port 3000.

## Test manually

Get books 
```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"{\n  books {\n    title\n    author\n  }\n}"}' --compressed
```

In order to login run:

```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"# Write your query or mutation here\n\n  mutation {\n    login(email: \"tnajun@atixlabs.com\", password: \"password\")\n  }\n\n"}' --compressed
```

Use the JWT token to get users list. Replace `${JWT_TOKEN}` with your token or set the variable.

```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' -H "Authorization: Bearer ${JWT_TOKEN}" --data-binary '{"query":"{\n  users {\n    name\n  }\n}"}' --compressed
```