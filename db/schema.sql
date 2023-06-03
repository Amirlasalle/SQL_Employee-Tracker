DROP DATABASE IF EXISTS employerTracker_db;
-- Creates the "employerTracker_db" database --
CREATE DATABASE employerTracker_db;

-- Makes it so all of the following code will affect inventory_db --
USE employerTracker_db;

-- Creates the table "produce" within inventory_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employee(id) ON DELETE SET NULL
);