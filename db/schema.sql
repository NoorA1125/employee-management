/*caps not mandatory but helps with readability */
DROP DATABASE IF EXISTS employeeDB; /*Never in real practice */
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role
CREATE TABLE employees