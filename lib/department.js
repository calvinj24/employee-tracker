const cTable = require('console.table');

class Department {
  constructor(connection, name) {
    this.name = name;
    this.connection = connection;
  }

  insert() {
    console.log('Inserting a new department...\n');
  
    const query = this.connection.query(
      'INSERT INTO departments SET ?',
      {
        name: this.name
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department inserted!\n');
      }
    );
  }
}

getDepartments = (connection) => {
  connection.query('SELECT * FROM departments', function(err, res) {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    connection.end();
  });
};


module.exports = { Department , getDepartments };