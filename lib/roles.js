const cTable = require('console.table');

class Role {
  constructor(connection) {
    this.connection = connection;
  }

  printAll() {
    this.connection.query('SELECT * FROM roles', function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    });
  };

  insert(title, salary, department_id) {
    console.log('Inserting a new role...\n');

    const query = this.connection.query(
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
}


module.exports = Role;