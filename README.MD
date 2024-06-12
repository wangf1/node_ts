Small practice project for TypeScript and Node.js, in order to prepare for TypeScript implementation of [LOX language interceptor](https://github.com/munificent/craftinginterpreters).

---

# How to Run

## Get MongoDB instance

For example, get free MongoDB instance from MongoDB Atlas, or create docker container with MongoDB.

## Put MongoDB URL in `.env`

Create `.env` file in root directory, add the following content:

For example:

```
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.lk7fdpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## Start

```bash
npm install
npm start
```

## Test

### Create User

```bash
curl -X POST http://localhost:8080/auth/register \
-H "Content-Type: application/json" \
-d '{
    "email": "jack@test.com",
    "password": "123",
    "username": "Jack"
}'
```

### Login

```bash
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "jack@test.com",
    "password": "123"
}' \
-i
```

### List User

The token `5a9b42a36f0cf65ca85b083dd49261f0b75953fb3cbfbc964ed9351d3f4cca3f` can be found in the response of the previous Login.

```bash
curl -X GET http://localhost:8080/users --cookie "token=5a9b42a36f0cf65ca85b083dd49261f0b75953fb3cbfbc964ed9351d3f4cca3f"
```

### Delete User

The user ID `6669336de3835870124b4f3e` can be found in the List User response. The token `5a9b42a36f0cf65ca85b083dd49261f0b75953fb3cbfbc964ed9351d3f4cca3f` can be found in the Login response.

```bash
curl -X DELETE http://localhost:8080/users/6669336de3835870124b4f3e \
--cookie "token=5a9b42a36f0cf65ca85b083dd49261f0b75953fb3cbfbc964ed9351d3f4cca3f"
```

---
