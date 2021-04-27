/*caps not mandatory but helps with readability */
 -- Add departments, roles, employees

 -- View departments, roles, employees

 -- Update employee roles

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
    title VARCHAR(30) NULL, --to hold role title
    salary DECIMAL(10,2) NULL, --to hold role salary
    department_ID INT NOT NULL, -- to hold reference to department role belongs
    PRIMARY KEY (id),
    FOREIGN KEY (department_ID) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_ID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_ID) REFERENCES departments(id),
    FOREIGN KEY (role_ID) REFERENCES role(id),
    FOREIGN KEY (manager_ID) REFERENCES employees(id)
)