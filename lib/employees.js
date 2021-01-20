const cTable = require('console.table');

class Employee {
  constructor(connection) {
    this.connection = connection;
  }

  printAll() {
    this.connection.query('SELECT * FROM employees', function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    });
  };

  insert(first_name, last_name, role_id, manager_id) {
    console.log('Inserting a new employee...\n');

    const query = this.connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        manager_id: manager_id
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' employee inserted!\n');
      }
    )
  }
}


module.exports = Employee;