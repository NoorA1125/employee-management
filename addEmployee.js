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

exports.moldule