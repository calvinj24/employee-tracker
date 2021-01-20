const inquirer = require('inquirer');
const mysql = require('mysql2');

const Department = require('./lib/department');
const Role = require('./lib/roles');
const Employee = require('./lib/employees');

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
  })
}

newRole = () => {
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
      name: 'depID',
      message: 'What is the department ID for the role?'
    }
  ])
  .then(answer => {
    role.insert(answer.title, answer.salary, answer.depID);
  })
}

newEmployee = () => {
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
      name: 'roleID',
      message: 'Employee Role ID:',
    },
    {
      name: 'manID',
      message: 'Employee Manager ID:',
      default: null
    }
  ])
  .then(answer => {
    emp.insert(answer.firstName, answer.lastName, answer.roleID, answer.manID);
  })
}

// following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
promptStart = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { key: 1, name: 'view all departments'},
        { key: 2, name: 'view all roles'},
        { key: 3, name: 'view all employees'},
        { key: 4, name: 'add a department'},
        { key: 5, name: 'add a role'},
        { key: 5, name: 'add an employee'}
      ]
    }
  ])
  .then(answer => {
    switch(answer.action) {
      case 'view all departments':
        dep.printAll();
        break;
      case 'view all roles':
        role.printAll();
        break;
      case 'view all employees':
        emp.printAll();
        break;
      case 'add a department':
        newDepartment();
        break;
      case 'add a role':
        newRole();
        break;
      case 'add an employee':
        newEmployee();
        break;
    }
  })
}

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  promptStart();
});