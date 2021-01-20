const inquirer = require('inquirer');
const mysql = require('mysql2');

const { Department , getDepartments } = require('./lib/department');
const { Role , getRoles } = require('./lib/roles');
const { Employee , getEmployees } = require('./lib/employees');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password123!',
  database: 'employeesDB'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  //promptStart();
});


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
        { key: 3, name: 'view all employees'}
      ]
    }
  ])
  .then(answer => {
    if (answer.action === 'view all departments') {
      getDepartments(connection);
    } else if (answer.action === 'view all roles') {
      getRoles();
    } else if (answer.action === 'view all employees') {
      getEmployees();
    }
  })
}
