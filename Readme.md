# Installation

Run the following command to clone the repository

```
git clone https://github.com/tinku06071999/Movie-lists.git
```

Go to `frontend` and `backend` directory to install packages

```
cd frontend
npm install
```

```
cd backend
npm install
```

# Configuration

Create `.env` file inside `backend` directory and copy the following code

```
MONGO_URI=Your mongodb URI
PORT=3001
JWT_SECRET=a random secret key eg. hello
```

# Run the App

Go to `backend` and `frontend` directory and start the server

```
cd backend
node server.js
```

```
cd frontend
npm start
```

# Live Demo

https://movie-lists-client.vercel.app/
