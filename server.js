const inquirer = require('inquirer');
const mysql = require('mysql2');

const Department = require('./lib/department');
const Role = require('./lib/roles');
const Employee = require('./lib/employees');
const { async } = require('rxjs');
const { resolve } = require('path');
const { rejects } = require('assert');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password123!',
  database: 'employeesDB'
});

// create connections
const dep = new Department(connection);
const role = new Role(connection);
const emp = new Employee(connection);

// populate choice arrays
const depArr = dep.getAll();
const roleArr = role.getAll();
const empArr= emp.getAll();

// prompts
newDepartment = () => {
  inquirer
  .prompt([
    {
      name: 'depName',
      message: 'What is the name of the department?'
    }
  ])
  .then(answer => {
    dep.insert(answer.depName);
    setTimeout(afterPrompt, 3000)
  })
}

newRole = (choices) => {
  
  inquirer
    .prompt([
      {
        name: 'title',
        message: 'What is the role title?'
      },
      {
        name: 'salary',
        message: 'What is the salary for the role?'
      },
      {
        type: 'list',
        name: 'depID',
        message: 'What is the department ID for the role?',
        choices: choices
      }
    ])
    .then(answer => {
      role.insert(answer.title, answer.salary, answer.depID);
      setTimeout(afterPrompt, 3000)
    })
}

newEmployee = (roles, emps) => {
  inquirer
  .prompt([
    {
      name: 'firstName',
      message: 'Employee First Name:'
    },
    {
      name: 'lastName',
      message: 'Employee Last Name:'
    },
    {
      type: 'list',
      name: 'roleID',
      message: 'Employee Role ID:',
      choices: roles
    },
    {
      type: 'list',
      name: 'manID',
      message: 'Employee Manager ID:',
      choices: emps
    }
  ])
  .then(answer => {
    console.log(emps);
    emp.insert(answer.firstName, answer.lastName, answer.roleID, answer.manID);
    setTimeout(afterPrompt, 3000);
  })
};

updateEmployee = (emps, roles) => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee would you like to update?',
      choices: emps
    },
    {
      type: 'list',
      name: 'role',
      message: 'What would you like to change their role to?',
      choices: roles
    }
  ])
  .then(answers => {
    emp.updateRole(answers.employee, answers.role);
    setTimeout(afterPrompt, 3000);
    return;
  })
};

prompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { value: 1, name: 'view all departments'},
        { value: 2, name: 'view all roles'},
        { value: 3, name: 'view all employees'},
        { value: 4, name: 'add a department'},
        { value: 5, name: 'add a role'},
        { value: 6, name: 'add an employee'},
        { value: 7, name: 'update employee role'}
      ]
    }
  ])
}

getResponse = (answer) => {
  
  switch(answer.action) {
    case 1:
      dep.printAll();
      setTimeout(afterPrompt, 3000);
      break;
    case 2:
      role.printAll();
      setTimeout(afterPrompt, 3000);
      break;
    case 3:
      emp.printAll();
      setTimeout(afterPrompt, 3000);
      break;
    case 4:
      newDepartment();
      break;
    case 5:
      newRole(depArr);
      break;
    case 6:
      newEmployee(roleArr, empArr);
      break;
    case 7:
      updateEmployee(empArr, roleArr);
      break;
    default:
      return;
  }
}

afterPrompt = () => {
  inquirer
  .prompt([
    {
      name: 'continue',
      type: 'confirm',
      message: 'Would you like to continue?'
    }
  ])
  .then(answer => {
    if (answer.continue) {
      startPrompt();
    } else {
      connection.end();
    }
  })
};

startPrompt = () => {
  prompt()
  .then(answer => {
    getResponse(answer)
  })
};

// start connection
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  startPrompt()
});
