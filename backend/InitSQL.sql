-- Creates the 'usuarios' table
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(60) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
);

