const cTable = require('console.table');

class Role {
  constructor(connection, title, salary, department_id) {
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
    this.connection = connection;
  }

  insert() {
    console.log('Inserting a new role...\n');

    const query = this.connection.query(
      'INSERT INTO roles SET ?',
      {
        title: this.title,
        salary: this.salary,
        department_id: this.department_id
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' role inserted!\n');
      }
    )
  }
}

getRoles = () => {
  connection.query('SELECT * FROM roles', function(err, res) {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    connection.end();
  });
};

module.exports = { Role , getRoles };