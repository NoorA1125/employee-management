const mysql = require('mysql');
const inquirer = require('inquirer');
const figlet = require('figlet');
const consoleTable = require('console.table') //Helps us display our application as a table in the console.

//Custom console log text before application using Figlet.
var figlet = require('figlet');
 
figlet('Employee Management System', function(err, data) {
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
connection.connect( ()=> (err) => {
    if(err) throw err;
    startApp();
});

function startApp() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Hi there, what would you like to do?",
        choices:[]
    })
    .then(function(answer){
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }
    })
}