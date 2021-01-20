const cTable = require('console.table');

class Department {
  constructor(connection) {
    this.connection = connection;
  }

  printAll() {
    this.connection.query('SELECT * FROM departments', function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    });
  };

  insert(name) {
    console.log('Inserting a new department...\n');
  
    const query = this.connection.query(
      'INSERT INTO departments SET ?',
      {
        name: name
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department inserted!\n');
      }
    );
  }
}

module.exports = Department;