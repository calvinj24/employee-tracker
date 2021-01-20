const cTable = require('console.table');

class Employee {
  constructor(connection, first_name, last_name, role_id, manager_id) {
    this. connection = connection;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  insert() {
    console.log('Inserting a new employee...\n');

    const query = this.connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: this.first_name,
        last_name: this.last_name,
        role_id: this.role_id,
        manager_id: this.manager_id
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' employee inserted!\n');
      }
    )
  }
}

// View all employees 
getEmployees = () => {
  connection.query('SELECT * FROM employees', function(err, res) {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    connection.end();
  });
};

module.exports = { Employee , getEmployees }