INSERT INTO departments (name) values ('Sales');
INSERT INTO departments (name) values ('Engineering');
INSERT INTO departments (name) values ('Finance');
INSERT INTO departments (name) values ('Legal');

INSERT INTO roles (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO roles (title, salary, department_id) values ('Salesperson', 80000, 1);
INSERT INTO roles (title, salary, department_id) values ('Lead Engineer', 120000, 2);
INSERT INTO roles (title, salary, department_id) values ('Engineer', 100000, 2);
INSERT INTO roles (title, salary, department_id) values ('Accountant', 100000, 3);
INSERT INTO roles (title, salary, department_id) values ('Lawyer', 130000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Bob', 'Johnson', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Jane', 'Doe', 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Ashley', 'Johnson', 4, 3);
