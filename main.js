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
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Welcome@2020!",
    database: "employeeDb"
  });
  
  connection.connect(function(err) {
      if (err) throw err;
      startApp();
    });

// //check for error else start application

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
        });
}


function viewEmployeesByDepartment() {
    const query = `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, 
    role.title FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN departments departments on 
    role.department_id
     = departments.id WHERE departments.id;`;
    connection.query(query, function (err, query) {
        console.table(query); 
        startApp();
    });

};

function viewEmployees() {
    const query = ` SELECT employees.id,employees.first_name, employees.last_name, 
    role.title, departments.name AS department, role.salary, CONACT(manager.first_name, ' ', manager.last_name) 
    AS Manager FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN departments on role.department_id = 
    departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;`;
    connection.query(query, function (err, query) {
        console.table(query); 
        startApp();
    });
};

function viewDepartment() {
    const query = `SELECT id AS department_id, name AS departments from departments;`;
    connection.query(query, function (err, query) {
        console.table(query); 
        startApp();
    });
};

function viewRoles() {
    const query = `SELECT id AS role_id, title, salary, salary AS salaries from role;`;
    connection.query(query, function (err, query) {
        console.table(query); 
        startApp();
    });

};

function addEmployee() {
    //arrays to display prompt choices from database items 
    var roleChoice = [];
    connection.query("SELECT * FROM role", function(err, resRole) {
      if (err) throw err;
      for (var i = 0; i < resRole.length; i++) {
        var roleList = resRole[i].title;
        roleChoice.push(roleList);
      };
  
      var departmentChoice = [];
      connection.query("SELECT * FROM departments", function(err, resDepartment) {
        if (err) throw err;
        for (var i = 0; i < resDepartment.length; i++) {
          var departmentList = resDepartment[i].name;
          departmentChoice.push(departmentList);
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
            if (resRole[i].title === answer.role_id) {
              chosenRole = resRole[i];
            }
          };
  
          var chosenDepartment;
          for (var i = 0; i < resDepartment.length; i++) {
            if (resDepartment[i].name === answer.department_id) {
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
            department_id: chosenDepartment.id
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
        for (var i = 0; i < resDepartment.length; i++) {
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

                var chosenDepartment;
                for (var i = 0; i < resDepartment.length; i++) {
                    if (resDepartment[i].name === answer.department_id) {
                        chosenDepartment = resDepartment[i];
                    }
                };

                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: chosenDepartment.id
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
      connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees", function(err, resEmployeeloyee) {
        if (err) throw err;
        for (var i = 0; i < resEmployeeloyee.length; i++) {
          const employeeList = resEmployeeloyee[i].name;
          employeeChoice.push(employeeList);
      };
  
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "rawlist",
          message: "Select the employee you would like to remove:",
          choices: employeeChoice
        },
    ])
    .then(function(answer) {
  
      var chosenEmployee;
          for (var i = 0; i < resEmployeeloyee.length; i++) {
            if (resEmployeeloyee[i].name === answer.employee_id) {
              chosenEmployee = resEmployeeloyee[i];
          }
        };
  
      connection.query(
        "DELETE FROM employees WHERE id=?",
        [chosenEmployee.id],
  
        function(err) {
          if (err) throw err;
          console.log("Employee successfully removed!");
          startApp();
        }
      );
     });
    })
  };

function updateEmployeeRole() {
    const employeeChoice = [];
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees", function (err, resEmployeeloyee) {
        if (err) throw err;
        for (var i = 0; i < resEmployeeloyee.length; i++) {
            const employeeList = array[i].name;
            employeeChoice.push(employeeList)

        };
        var roleChoice = [];
        connection.query("SELECT * FROM role", function (err, resRole) {
            if (err) throw err;
            for (var i = 0; i < resRole.length; i++) {
                const roleList = resRole[i].title;
                roleChoice.push(roleList);
            };

            inquirer
                .prompt([
                    {
                        name: "employee_id",
                        type: "rawlist",
                        message: "Select the employee you would like to update:",
                        choices: employeeChoice
                    },
                    {
                        name: "role_id",
                        type: "rawlist",
                        message: "Select employee's new role:",
                        choices: roleChoice
                    }
                ]).then(function (answer) {
                    var chosenEmployee;
                    for (var i = 0; i < resEmployeeloyee.length; i++) {
                        chosenEmployee = resEmployeeloyee[i]
                    }
                });
            var chosenRole;
            for (var i = 0; i < resRole.length; i++) {
                if (resRole[i].title === answer.role_id) {
                    chosenRole = resRole[i];
                }
            };
            connection.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [chosenRole.id, chosenEmployee.id],
                function (err) {
                    if (err) throw err;
                    console.log("Employee new role successfully updated!");
                    startApp();
                }
            );
        })
    })
}

//Function to update employee manager
function updateEmployeeMng() {
    var employeeChoice = [];
      connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees", function(err, resEmployee) {
        if (err) throw err;
        for (var i = 0; i < resEmployee.length; i++) {
          var empList = resEmployee[i].name;
          employeeChoice.push(empList);
      };
  
      inquirer
      .prompt([
      {
        name:"employees",
        type: "rawlist",
        message: "Select employee you would like to update manager:",
        choices: employeeChoice
      },
      {
        name: "Managerid",
        type: "rawlist",
        message: "Select Manager among employees:",
        choices: employeeChoice
      }
    ])
    .then(function(answer) {
  
      var chosenEmployee;
          for (var i = 0; i < resEmployee.length; i++) {
            if (resEmployee[i].name === answer.employees) {
              chosenEmployee = resEmployee[i];
          }
        };
        var chosenManager;
          for (var i = 0; i < resEmployee.length; i++) {
            if (resEmployee[i].name === answer.Managerid) {
              chosenManager = resEmployee[i];
          }
        };
        connection.query(
          "UPDATE employees SET manager_id = ? WHERE id = ?",
  
          [chosenManager.id, chosenEmployee.id],
          function(err) {
            if (err) throw err;
            console.log("Employee Manager successfully updated!");
            startApp();
          }
        );
      })
     })
  };
  