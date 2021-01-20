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
      resolve();
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
    emp.insert(answer.firstName, answer.lastName, answer.roleID, answer.manID);
  })
}

updateEmployee = (roles, emps) => {
  console.log(emps)
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
  })
}

// following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
promptStart = () => {
  let roles = role.getAll();
  let employees = emp.getAll();
  let departments = dep.getAll();
  inquirer
  .prompt([
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
  .then(answer => {
    switch(answer.action) {
      case 1:
        dep.printAll();
        break;
      case 2:
        role.printAll();
        break;
      case 3:
        emp.printAll();
        break;
      case 4:
        newDepartment();
        break;
      case 5:
        choices = dep.getAll();
        newRole(departments);
        break;
      case 6:
        newEmployee(roles, employees);
        break;
      case 7:
        updateEmployee(roles, employees);
        break;
    }
  })
}

// start connection
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  promptStart();
});
