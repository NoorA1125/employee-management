const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
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
var connection = mysql.createConnection({
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
    var query = `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, role.title FROM employees LEFT JOIN role on employees.role_ID = role.id LEFT JOIN departments departments on role.department_ID = departments.id WHERE departments.id;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })

}

function viewEmployees() {
    var query = ` SELECT employees.id,employees.first_name, employees.last_name, role.title, departments.name AS department, role.salary, CONACT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN role on employees.role_ID = role.id LEFT JOIN departments on role.department_ID = departments.id LEFT JOIN employees manager on manager.id = employees.manager_ID;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })
}

function viewDepartment() {
    var query = `SELECT id AS department_ID, name AS departments from departments;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })
}

function viewRoles() {
    var query = `SELECT id AS role_ID, title, salary, salary AS salaries from role;`;
    connection.query(query, function (err, query) {
        console.table(query); //displays a table with the above data (employees, department, role & salary)
        startApp();
    })

}

function addEmployee() {
    var roleChoice = []; //prompt role choices
    connection.query("SELECT * FROM role", () => (err, resRole) => {
        if (err) throw err;
        for (var i = 0; i < resRole.length; i++) {
            var roleList = resRole[i].name;
            roleChoice.push(roleList) //adding roles to the empty array
        }
         var departmentChoice = [];
    connection.query("SELECT * FROM departments", function(err, resDepartment) {
      if (err) throw err;
      for (var i = 0; i < resDepartment.length; i++) {
        var departmentList = resDepartment[i].name;
        departmentChoice.push(deptList);
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
    .then(function(answer) {
      //for loop to retun 
      var chosenRole;
        for (var i = 0; i < resRole.length; i++) {
          if (resRole[i].title === answer.role_ID) {
            chosenRole = resRole[i];
          }
        };

        var chosenDepartmentt;
        for (var i = 0; i < resDept.length; i++) {
          if (resDepartment[i].name === answer.department_ID) {
            chosenDepartment = resDepartment[i];
          }
        };
      //connection to insert response into database  
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: chosenRole.id,
          department_ID: chosenDepartment.ID
        },
        function(err) {
          if (err) throw err;
          console.log("Employee " + answer.firstName + " " + answer.lastName + " successfully added!");
          startApp();
        }
      );
    })
   });
  })
};