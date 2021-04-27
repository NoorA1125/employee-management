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
INSERT INTO employees(first_name, last_name, role_ID, manager_ID, department_ID) VALUES
("Noor", "Abdikadir", 7, NULL, 4),
("Harun", "Abdi", 5, NULL, 3),
("Halima", "Haji", 8, 1, 4),
("Malyun", "Abdi", 1, NULL, 1),
("Whitney", "Houston", 3, NULL, 2),
("John", "Smith", 6, 2, 3),
("Pedro", "Guitierez", 2, 4, 1),
("Niomi", "Garcia", 4, 5, 2),
("Okonkwo", "Dume", 9, NULL, 5),
("Okonkwo", "Dume", 10, 9, 5),
