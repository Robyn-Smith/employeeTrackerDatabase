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

// Function to view all departments
const viewAllDepartments = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM department');
    return rows;
};

// Function to view all roles
const viewAllRoles = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM role');
    return rows;
};

// Function to view all employees
const viewAllEmployees = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM employee');
    return rows;
};

// Function to add a department
const addDepartment = async (name) => {
    const result = await connection.execute(
        'INSERT INTO department (name) VALUES (?)', [name]
    );
    return result;
};

// Function to add a role
const addRole = async (title, salary, department_id) => {
    const result = await connection.execute(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]
    );
    return result;
};

// Function to add an employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const result = await connection.execute(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]
    );
    return result;
};

// Function to update an employee role
const updateEmployeeRole = async (role_id, employee_id) => {
    const result = await connection.execute(
        'UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]
    );
    return result;
};

// BONUS // 
const updateEmployeeManager = async (employee_id, manager_id) => {
    const result = await connection.execute('UPDATE employee SET manager_id = ? where id = ?', [manager_id, employee_id]);
    return result;
}

const deleteDepartment = async (department_id) => {
    await connection.execute('UPDATE ROLE SET department_id = null where department_id = ?', [department_id]);
    const result = await connection.execute('DELETE from department where id = ? ', [department_id]);
    return result;
}

const deleteRole = async (role_id) => {
    await connection.execute('update employee set role_id = null where role_id = ?', [role_id]);
    const result = await connection.execute('DELETE from role where id = ? ', [role_id]);
    return result;
}

const viewEmployeesByManager = async (manager_id) => {
    const [rows, fields] = await connection.execute('SELECT id, first_name, last_name, role_id FROM employee where manager_id = ?', [manager_id]);
    return rows;
}

const viewEmployeesByDepartment = async (department_id) => {
    const [rows, fields] = await connection.execute('SELECT * FROM EMPLOYEE e JOIN ROLE r ON e.role_id = r.id where r.department_id = ?', [department_id]);
    return rows;
}

const deleteEmployees = async (employee_id) => {
    await connection.execute('UPDATE employee SET manager_id = null where manager_id = ?', [employee_id]);
    const result = await connection.execute('DELETE from employee where id = ? ', [employee_id]);
    return result;
}

const viewDepatmentBudget = async (department_id) => {
    const [rows, fields] = await connection.execute(
        'select d.id, d.name, sum(salary) as budget from role r JOIN employee e on r.id = e.role_id join department d on d.id = r.department_id where r.department_id = ?', [department_id]
    )
    return rows;
}

const updateRoleDepartment = async (department_id, role_id) => {
    const result = await connection.execute('update role set department_id = ? where id = ?', [department_id, role_id]);
    return result;
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deleteDepartment,
    updateEmployeeManager,
    deleteRole,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteEmployees,
    viewDepatmentBudget,
    updateRoleDepartment
};