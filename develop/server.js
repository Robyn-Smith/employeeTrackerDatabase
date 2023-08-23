const inquirer = require('inquirer');
const db = require('./db/db.js');

async function app() {
    let continueExecution = true;

    while (continueExecution) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'Add a department',
                'Delete a department',
                'View all roles',
                'Add a role',
                'Reassign department for the role',
                'Delete a role',
                'View all employees',
                'View all employees by manager',
                'View employees by department',
                'View total budget by department',
                'Add an employee',
                'Delete an employee',
                'Update manager',
                'Update an employee role',
                'Quit'
            ],
        });

        switch (action) {
            case 'View all departments':
                const departments = await db.viewAllDepartments();
                console.table(departments);
                break;
            case 'View all roles':
                const roles = await db.viewAllRoles();
                console.table(roles);
                break;
            case 'View all employees':
                const employees = await db.viewAllEmployees();
                console.table(employees);
                break;
            case 'Add a department':
                const { name } = await inquirer.prompt({ type: 'input', name: 'name', message: 'Enter the department name:' });
                await db.addDepartment(name);
                break;
            case 'Add a role':
                const roleData = await inquirer.prompt([
                    { type: 'input', name: 'title', message: 'Enter the role title:' },
                    { type: 'input', name: 'salary', message: 'Enter the salary for the role:' },
                ]);
                const department_id = await promptDepartmentSelection();
                await db.addRole(roleData.title, roleData.salary, department_id);
                break;
            case 'Reassign department for the role':
                const role_id = await promptRoleSelection();
                const new_dep_id = await promptDepartmentSelection();
                await db.updateRoleDepartment(new_dep_id, role_id);
                break;
            case 'Add an employee':
                const employeeData = await inquirer.prompt([
                    { type: 'input', name: 'first_name', message: 'Input first name:' },
                    { type: 'input', name: 'last_name', message: 'Input last name:' },
                ]);


                const emp_role_id = await promptRoleSelection();
                const manager_id = await promptEmployeeSelection('Select manager: ');

                await db.addEmployee(employeeData.first_name, employeeData.last_name, emp_role_id, manager_id);

                break;
            case 'Update an employee role':
                const emp_to_update_id = await promptEmployeeSelection('Select employee: ');
                const new_emp_role_id = await promptRoleSelection();
                await db.updateEmployeeRole(new_emp_role_id, emp_to_update_id);
                break;
            case 'Update manager':
                const emp_to_update_manager_id = await promptEmployeeSelection("Select employee: ");
                const manager_to_update_id = await promptEmployeeSelection('Select new manager: ');
                await db.updateEmployeeManager(emp_to_update_manager_id, manager_to_update_id);
                break;
            case 'Delete a department':
                const department_to_delete_id = await promptDepartmentSelection();
                await db.deleteDepartment(department_to_delete_id);
                break;
            case 'Delete a role':
                const role_to_delete_id = await promptRoleSelection();
                await db.deleteRole(role_to_delete_id);
                break;
            case 'View all employees by manager':
                const manager_to_filter_by = await promptEmployeeSelection('Select manager:');
                const empsByManager = await db.viewEmployeesByManager(manager_to_filter_by);
                console.table(empsByManager);
                break;
            case 'View employees by department':
                const department_id_to_filter_by = await promptDepartmentSelection();
                const empsByDepartment = await db.viewEmployeesByDepartment(department_id_to_filter_by);
                console.table(empsByDepartment);
                break;
            case 'Delete an employee':
                const employee_to_delete_id = await promptEmployeeSelection('Select an employee: ');
                await db.deleteEmployees(employee_to_delete_id);
                break;
            case 'View total budget by department':
                const department_to_view_id = await promptDepartmentSelection();
                const totalBudget = await db.viewDepatmentBudget(department_to_view_id);
                console.table(totalBudget);
                break;
            default:
                continueExecution = false;
                break;
        }
    }

    process.exit();
}

async function promptDepartmentSelection() {
    const allDepartments = await db.viewAllDepartments();
    const departmentChoices = allDepartments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const { department_id } = await inquirer.prompt({
        type: 'list',
        name: 'department_id',
        message: 'Select the department:',
        choices: departmentChoices,
    });

    return department_id;
}

async function promptRoleSelection() {
    const allRoles = await db.viewAllRoles();
    const roleChoices = allRoles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const { role_id } = await inquirer.prompt({
        type: 'list',
        name: 'role_id',
        message: 'Select the role:',
        choices: roleChoices,
    });

    return role_id;
}

async function promptEmployeeSelection(message) {
    const allEmployees = await db.viewAllEmployees();
    const employeeChoices =
        [
            { name: 'None', value: null },
            ...allEmployees.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            })),
        ];



    const { employee_id } = await inquirer.prompt({
        type: 'list',
        name: 'employee_id',
        message: message,
        choices: employeeChoices,
    });

    return employee_id;
}

app();