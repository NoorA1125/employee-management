/*caps not mandatory but helps with readability */
DROP DATABASE IF EXISTS employeeDB; /*Never in real practice */
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_ID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_ID) REFERENCES departments(id)
);

CREATE TABLE employees (
    
)