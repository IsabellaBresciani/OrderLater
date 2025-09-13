# Frontend Application

This is the user interface for the application, built with React. It handles user registration, login, and provides access to protected content based on authentication status.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or newer recommended)
-   [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/))
-   A running instance of the backend server.

---

## 1. Getting Started

Navigate to the frontend directory from the project's root:

```bash
cd frontend
```
---

## 2. Install Dependencies

Navigate to the frontend directory from the project's root:

```bash
npm install
```

##  3. Environment Configuration
The application needs to know the URL of the backend API.
Change it in the frontend/src/services/baseURL.js file 
Note: Ensure the port (3001) matches the port your backend server is running on.

##  4. Running the Application
Once dependencies are installed and the environment is configured, you can start the development server.

```bash
# This will start the app, typically on http://localhost:3000 or a similar port
npm run dev 
# or if using Create React App:
npm start
```
