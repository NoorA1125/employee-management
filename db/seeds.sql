USE employeeDB;

/*Departments*/
INSERT INTO departments(name) VALUES
("Finance"),
("Marketing"),
("Operations"),
("Engineering"),
("HR");


/*Roles*/
INSERT INTO role(title, salary, department_ID) VALUES
("Accountant Manager", 100000, 1), --role, salary, employee count
("Financial Associate", 62000,1),
("Sales Manager", 90000, 2),
("Sales Associate", 50000, 2),
("Operations Manager", 80000, 3),
("Operations Associate", 50000, 3),
("Chef Engineer",110000,4),
("Engineer", 100000,4),
("HR Manager",80000,5),
("HR Associate", 60000, 5);


/*Employees*/
INSERT INTO departments(name) VALUES
("Finance"),
("Marketing"),
("Operations"),
("Engineering"),
("HR")