# Backend Setup Guide

This guide provides instructions for setting up and running the backend server for this project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A running database instance (e.g., PostgreSQL, MySQL).

---

## 1. Getting Started
First, navigate to the backend directory from the project's root:

```bash
cd backend
```
---

## 2. Install Dependencies
Install the required npm packages by running:

```bash
npm install
```

## 3. Create your Data Base
You need to create a database for the application. You can use any SQL database like PostgreSQL or MySQL. Below is an example SQL command to create a database and a users table:
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(60) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
);
```
---

## 4. Environment Configuration
The server requires environment variables for configuration, such as database credentials and security keys.
1. Create a .env file by copying the example file:
```bash
cp .env_example .env
```

1. Edit the .env file and fill in the values for your local environment.
```bash
# Server Configuration
PORT=3001

# Database Connection
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# JWT Secret for Authentication
JWT_SECRET=your_super_secret_key_for_jwt
```

---

## 5. Running the Server
Once the dependencies are installed and the .env file is configured, you can start the server.

* For development (with hot-reloading using nodemon):
```bash
npm run dev
```

* For production:
```bash
npm start
```

The server should now be running on the port specified in your .env file (e.g., http://localhost:3001).


##  Available Scripts

* npm start: Starts the server in production mode.
* npm run dev: Starts the server in development mode with nodemon, which automatically restarts the server on file changes.

## API Endpoints
The following routes are available:

* GET /health: Checks if the server is running.
* POST /api/auth/register: Registers a new user.
* POST /api/auth/login: Logs in an existing user and returns a JWT.