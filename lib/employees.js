const cTable = require('console.table');

class Employee {
  constructor(connection) {
    this.connection = connection;
  }

  printAll() {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON employees.manager_id = m.id;`;
    
    this.connection.query(sql, function(err, res) {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
    });
  };

  getAll() {
    const arr = [];
    this.connection.query('SELECT * FROM employees', function(err, res) {
      if (err) throw err;
      res.forEach(row => {
        arr.push({value: row.id, name: row.first_name + ' ' + row.last_name});
      });
    });
    return(arr);
  }

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

  updateRole(emp, role) {
    const sql = `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;
    const params = [role, emp]
    const query = this.connection.query(sql, params, function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' employee updated!\n');
    })
  }
}


module.exports = Employee;