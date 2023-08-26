const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'employees_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// The following functions allow the user to view all data in data base inclusing Employees, Departments, Roles etc
const view_Employees = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM employee');
    return rows;
};
const view_Departments = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM department');
    return rows;
};
const view_Roles = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM role');
    return rows;
};
const view_employees_under_Manager = async (manager_id) => {
    const [rows, fields] = await connection.execute('SELECT id, first_name, last_name, role_id FROM employee where manager_id = ?', [manager_id]);
    return rows;
}
const view_employees_in_Department = async (department_id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM EMPLOYEE e JOIN ROLE r ON e.role_id = r.id where r.department_id = ?', [department_id]);
    return rows;
}

// The following functions allow the user to add employees, roles and departments
const add_Employee = async (first_name, last_name, role_id, manager_id) => {
    const response = await connection.execute(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]
    );
    return response;
};
const add_Department = async (name) => {
    const response = await connection.execute(
        'INSERT INTO department (name) VALUES (?)', [name]
    );
    return response;
};
const add_Role = async (title, salary, department_id) => {
    const response = await connection.execute(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]
    );
    return response;
};

// The following functions allow the user to update and make changes to the database
const update_employee_Role = async (role_id, employee_id) => {
    const response = await connection.execute(
        'UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]
    );
    return response;
};
const update_Role_Department = async (department_id, role_id) => {
    const response = await connection.execute('update role set department_id = ? where id = ?', [department_id, role_id]);
    return response;
}
const update_employee_Manager = async (employee_id, manager_id) => {
    const response = await connection.execute('UPDATE employee SET manager_id = ? where id = ?', [manager_id, employee_id]);
    return response;
}

// The following functions allow the user to remove employees, roles or departments
const remove_Employee = async (employee_id) => {
    await connection.execute('UPDATE employee SET manager_id = null where manager_id = ?', [employee_id]);
    const response = await connection.execute('DELETE from employee where id = ? ', [employee_id]);
    return response;
}
const remove_Department = async (department_id) => {
    await connection.execute('UPDATE ROLE SET department_id = null where department_id = ?', [department_id]);
    const response = await connection.execute('DELETE from department where id = ? ', [department_id]);
    return response;
}
const remove_Role = async (role_id) => {
    await connection.execute('update employee set role_id = null where role_id = ?', [role_id]);
    const response = await connection.execute('DELETE from role where id = ? ', [role_id]);
    return response;
}

module.exports = {
    view_Employees,
    view_Departments,
    view_Roles,
    view_employees_under_Manager,
    view_employees_in_Department,
    add_Department,
    add_Role,
    add_Employee,
    update_employee_Role,
    update_Role_Department,
    update_employee_Manager,
    remove_Employee,
    remove_Department,
    remove_Role,
};