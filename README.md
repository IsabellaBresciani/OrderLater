#  Init-Auth-Project
Una aplicación simple de tipo full-stack que cuenta con un formulario para el usuario y un backend con autenticación basada en JWT. Este proyecto sirve como una plantilla fundamental para aplicaciones que requieren inicio de sesión de usuario y rutas protegidas. El frontend utiliza React para gestionar el estado de autenticación y proteger páginas, mientras que el backend con Node.js se encarga del registro de usuarios, el inicio de sesión y la generación de tokens.

#  Funcionalidades Principales

* Registro e Inicio de Sesión de Usuarios: Endpoints seguros para crear nuevos usuarios y autenticar a los existentes.
* Autenticación JWT: El backend genera JSON Web Tokens (JWT) tras un inicio de sesión exitoso.
* Rutas de Frontend Protegidas: El frontend de React protege ciertas páginas, haciéndolas accesibles solo para usuarios autenticados.
* Manejo de Expiración del Token: El frontend detecta automáticamente los tokens expirados y cierra la sesión del usuario.
* Gestión de Estado: Usa la Context API de React para gestionar el estado de autenticación global (token, datos del usuario).

#  Tecnologías (Tech Stack)

* Frontend: React
* Backend: Node.js | Express.js
* Autenticación: JSON Web Token (jsonwebtoken) | bcrypt para el hasheo de contraseñas.
* Base de Datos: (Se asume) MongoDB con Mongoose o PostgreSQL con Sequelize.

#  Cómo Funciona la Autenticación

1. Inicio de Sesión (Login): Un usuario envía sus credenciales a través del formulario de inicio de sesión.
2. Generación del Token: El servidor de Express valida las credenciales. Si son correctas, genera un JWT que contiene el ID del usuario y una fecha de expiración.
3. Almacenamiento del Token: El JWT se envía de vuelta al cliente de React, que lo almacena en localStorage. El estado de la aplicación se actualiza para reflejar que el usuario está autenticado.
4. Peticiones Autenticadas: Para las peticiones a endpoints protegidos de la API, el cliente adjunta el JWT en la cabecera Authorization (Bearer <token>).
5. Validación del Token: El servidor utiliza un middleware para verificar el JWT en las peticiones entrantes. Si el token es válido y no ha expirado, se concede el acceso.
6. Cierre de Sesión/Expiración: El cliente elimina el token de localStorage al cerrar la sesión o cuando detecta que el token ha expirado, finalizando así la sesión del usuario.


---------------------------------------------------------------------------------------------------

# Init-Auth-Project

A simple full-stack application featuring a user-facing form and a backend with JWT-based user authentication. This project serves as a foundational template for applications requiring user login and protected routes. The frontend uses React to manage authentication state and protect pages, while the Node.js backend handles user registration, login, and token generation.

# Core Features

* User Registration & Login: Secure endpoints for creating new users and authenticating existing ones.
* JWT Authentication: The backend generates JSON Web Tokens (JWT) upon successful login.
* Protected Frontend Routes: The React frontend protects certain pages, making them accessible only to authenticated users.
* Token Expiration Handling: The frontend automatically detects expired tokens and logs the user out.
* State Management: Uses React Context API for managing global authentication state (token, user data).


# Tech Stack
* Frontend: React
* Backend: Node.js | Express.js
* Authentication: JSON Web Token (jsonwebtoken) |  bcrypt for password hashing
* Database: (Assumed) MongoDB with Mongoose or PostgreSQL with Sequelize.


# How Authentication Works

1. Login: A user submits their credentials via the login form.
2. Token Generation: The Express server validates the credentials. If correct, it generates a JWT containing the user's ID and an expiration date.
3. Token Storage: The JWT is sent back to the React client, which stores it in localStorage. The application state is updated to reflect that the user is authenticated.
4. Authenticated Requests: For requests to protected API endpoints, the client attaches the JWT to the Authorization header (Bearer <token>).
5. Token Validation: The server uses middleware to verify the JWT on incoming requests. If the token is valid and not expired, access is granted.
6. Logout/Expiration: The client removes the token from localStorage on logout or when the token is detected as expired, effectively ending the user's session.

