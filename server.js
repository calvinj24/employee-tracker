
const mysql = require('mysql2');

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
  //afterConnection();
});


// Department routes

// Create department
createDepartment = (name) => {
  console.log('Inserting a new department...\n');
  
  const query = connection.query(
    'INSERT INTO departments SET ?',
    {
      name: name
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department inserted!\n');
    }
  );
};

// View all departments 
getDepartments = () => {
  connection.query('SELECT * FROM departments', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

// Role routes

// Create role
createRole = (title, salary, department_id) => {
  console.log('Inserting a new role...\n');

  const query = connection.query(
    'INSERT INTO roles SET ?',
    {
      title: title,
      salary: salary,
      department_id: department_id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' role inserted!\n');
    }
  )
}

// View all roles 
getRoles = () => {
  connection.query('SELECT * FROM roles', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};
