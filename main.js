const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const addEmployee = require('./addEmployee')
const consoleTable = require('console.table') //Helps us display our application as a table in the console.

//Custom console log text before application using Figlet. 2.0 - Success
figlet('Employee Management System', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "",
    database: "employeeDB"
});

//check for error else start application
connection.connect(() => (err) => {
    if (err) throw err;
    startApp();
});

function startApp() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Hi there, what would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View  Departments",
                "View Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Remove Employee", /*BONUS */
                "Update Employee Role",
                "Update Employee Manager",/*BONUS */
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Employees By Department":
                    viewEmployees();
                    break;
                case "View Departments":
                    viewEmployees();
                    break;
                case "View Roles":
                    viewEmployees();
                    break;
                case "Add Employee":
                    viewEmployees();
                    break;
                case "Add Department":
                    AddDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManagement();
                    break;

                case "Exit":
                    console.log("Thanks for using our Employee Management System!")
                    process.exit();
            }
        })
}


function viewEmployeesByDepartment() {
    const query = `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, 
    role.title FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN departments departments on 
    role.department_id
     = departments.id WHERE departments.id;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })

}

function viewEmployees() {
    const query = ` SELECT employees.id,employees.first_name, employees.last_name, 
    role.title, departments.name AS department, role.salary, CONACT(manager.first_name, ' ', manager.last_name) 
    AS Manager FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN departments on role.department_id = 
    departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })
}

function viewDepartment() {
    const query = `SELECT id AS department_id, name AS departments from departments;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })
}

function viewRoles() {
    const query = `SELECT id AS role_id, title, salary, salary AS salaries from role;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })

}

function addEmployee() {
    const roleChoice = [];
    connection.query("SELECT * FROM role", () => (err, resRole) => {
        if (err) throw err;
        for (let i = 0; i < resRole.length; i++) {
            const roleList = resRole[i].title;
            roleChoice.push(roleList);
        }
    })
    const departmentChoice = [];
    connection.query("SELECT * FROM departments", () => (err, resDepartment) => {
        if (err) throw err;
        for (let i = 0; i < resDepartment.length; i++) {
            let departmentList = resDepartment[i].name;
            departmentChoice.push(departmentList);
        }
    })
}

inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name:"
        },
        {
            name: "role_id",
            type: "rawlist",
            message: "Select employee role:",
            choices: roleChoice
        },
        {
            name: "department_id",
            type: "rawlist",
            message: "Select employee's department:",
            choices: departmentChoice
        },

    ])
    .then(function (answer) {
        //for loop to retun 
        const chosenRole;
        for (let i = 0; i < resRole.length; i++) {
            if (resRole[i].title === answer.role_id) {
                chosenRole = resRole[i];
            }
        }

        const chosenDepartment;
        for (let i = 0; i < resDept.length; i++) {
            if (resDepartment[i].name === answer.department_id) {
                chosenDepartment = resDepartment[i];
            }
        }
    });

connection.query(
    "INSERT INTO employees SET ?",
    {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: chosenRole.id,
        department_id: chosenDept.id
    },
    function (err) {
        if (err) throw err;
        console.log("Employee " + answer.firstName + " " + answer.lastName + " successfully added!");
        startApp();
    }
);

//adding the department
function AddDepartment() {
    inquirer
        .prompt([{
            name: "department",
            type: "input",
            message: "Enter new departments name: "
        }
        ]).then(function (answer) {
            connection.query("INSERT INTO departments SET?"),
                { name: answer.department },
                function (err) {
                    if (err) throw err;
                    console.log("Department " + answer.department + " successfully added!");
                    startApp();
                }
        })
}

function addRole() {
    const departmentChoice = [];
    connection.query("SELECT * FROM departments", function (err, resDepartment) {
        if (err) throw err;
        for (let i = 0; i < resDepartment.length; i++) {
            let departmentList = resDeparmentt[i].name;
            departmentChoice.push(departmenttList);
        }
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter new role's name:"
                },
                {
                    name: "salary",
                    type: "number",
                    message: "Enter new role's salary:"
                },
                {
                    name: "department_id",
                    type: "rawlist",
                    message: "Select employee's department:",
                    choices: departmentChoice
                }
            ]).then(function (answer) {

                const chosenDepartment;
                for (let i = 0; i < resDepartment.length; i++) {
                    if (resDepartment[i].name === answer.department_id) {
                        chosenDepartment = resDepartment[i];
                    }
                };

                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: chosenDept.id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("New role " + answer.title + " successfully added!");
                        startApp();
                    }
                );
            });
    })
}

//now lets remove an employee
function removeEmployee() {
    const employeeChoice = [];
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees", function (err, employeeChoice))
    if (err) throw err;
    for (let i = 0; resEmployee.length; i++) {
        let employeeList = resEmployee[i].name;
        employeeChoice.push(empList);
    };
    inquirer
        .prompt([
            {
                name: "employee_id",
                type: "rawlist",
                message: "Select the employee you would like to remove:",
                choices: employeeChoice
            },
        ]).then(function (answer) {
            const chosenEmployee;
            for (var i = 0; i < resEmployee.length; i++) {
                if (resEmployee[i].name === answer.employee_id) {
                    chosenEmployee = resEmployee[i];
                }
            };

            connection.query(
                "DELETE FROM employee WHERE id=?",
                [chosenEmployee.id],
                function (err) {
                    if (err) throw err;
                    console.log("Employee successfully removed!");
                    startApp();
                }
            )
        })
}