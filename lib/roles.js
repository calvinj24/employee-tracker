const cTable = require('console.table');

class Role {
  constructor(connection) {
    this.connection = connection;
  }

  printAll() {
    const sql = `SELECT roles.id, roles.title, departments.name department, roles.salary
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id;`;

    this.connection.query(sql, function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    });
  };

  getAll() {
    const arr = [];
    this.connection.query('SELECT * FROM roles', function(err, res) {
      if (err) throw err;
      res.forEach(row => {
        arr.push({value: row.id, name: row.title});
      });
    });
    return(arr);
  }

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