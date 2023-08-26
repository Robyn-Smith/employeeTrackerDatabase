const inquirer = require('inquirer');
const db = require('./JavaScript/employeeDatabase.js')

async function runPrompts() {
    let continueExecution = true;

    while (continueExecution) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Please choose an option below:',
            choices: [
                'view employees',
                'view departments',
                'view roles',
                'view employees under chosen manager',
                'view employees within chosen department',
                'add new employee',
                'add new department',
                'add new role',
                'update chosen employee role',
                'update manager',
                'change the department of chosen role',
                'remove employee',
                'remove department',
                'remove role',
                'END'
            ],
        });

        switch (action) {
            case 'view departments':
                const departments = await db.view_Departments();
                console.table(departments);
                break;
            case 'view roles':
                const roles = await db.view_Roles();
                console.table(roles);
                break;
            case 'view employees':
                const employees = await db.view_Employees();
                console.table(employees);
                break;
            case 'add new department':
                const { name } = await inquirer.prompt({ type: 'input', name: 'name', message: 'Please enter the name of the department:' });
                await db.add_Department(name);
                break;
            case 'add new role':
                const roleData = await inquirer.prompt([
                    { type: 'input', name: 'title', message: 'Please enter the name of the role:' },
                    { type: 'input', name: 'salary', message: 'Please enter the annual salary of the new role:' },
                ]);
                const department_id = await promptDepartmentSelection();
                await db.add_Role(roleData.title, roleData.salary, department_id);
                break;
            case 'change the department of chosen role':
                const role_id = await promptRoleSelection();
                const new_dep_id = await promptDepartmentSelection();
                await db.update_Role_Department(new_dep_id, role_id);
                break;
            case 'add new employee':
                const employeeData = await inquirer.prompt([
                    { type: 'input', name: 'first_name', message: 'Please enter the employee\'s first name:' },
                    { type: 'input', name: 'last_name', message: 'Please enter the employee\'s surname:' },
                ]);


                const emp_role_id = await promptRoleSelection();
                const manager_id = await promptEmployeeSelection('Please choose a manager: ');

                await db.add_Employee(employeeData.first_name, employeeData.last_name, emp_role_id, manager_id);

                break;
            case 'update chosen employee role':
                const emp_to_update_id = await promptEmployeeSelection('Please choose an employee: ');
                const new_emp_role_id = await promptRoleSelection();
                await db.update_employee_Role(new_emp_role_id, emp_to_update_id);
                break;
            case 'update manager':
                const emp_to_update_manager_id = await promptEmployeeSelection("Please choose an employee: ");
                const manager_to_update_id = await promptEmployeeSelection('Please assign a new manager: ');
                await db.update_employee_Manager(emp_to_update_manager_id, manager_to_update_id);
                break;
            case 'remove department':
                const department_to_delete_id = await promptDepartmentSelection();
                await db.remove_Department(department_to_delete_id);
                break;
            case 'remove role':
                const role_to_delete_id = await promptRoleSelection();
                await db.remove_Role(role_to_delete_id);
                break;
            case 'view employees under chosen manager':
                const manager_to_filter_by = await promptEmployeeSelection('Please choose a manager:');
                const empsByManager = await db.view_employees_under_Manager(manager_to_filter_by);
                console.table(empsByManager);
                break;
            case 'view employees within chosen department':
                const department_id_to_filter_by = await promptDepartmentSelection();
                const empsByDepartment = await db.view_employees_in_Department(department_id_to_filter_by);
                console.table(empsByDepartment);
                break;
            case 'remove employee':
                const employee_to_delete_id = await promptEmployeeSelection('Please choose an employee: ');
                await db.remove_Employee(employee_to_delete_id);
                break;
            default:
                continueExecution = false;
                break;
        }
    }

    process.exit();
}

async function promptEmployeeSelection(message) {
    const allEmployees = await db.view_Employees();
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

async function promptDepartmentSelection() {
    const allDepartments = await db.view_Departments();
    const departmentChoices = allDepartments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const { department_id } = await inquirer.prompt({
        type: 'list',
        name: 'department_id',
        message: 'Please choose a department:',
        choices: departmentChoices,
    });

    return department_id;
}

async function promptRoleSelection() {
    const allRoles = await db.view_Roles();
    const roleChoices = allRoles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const { role_id } = await inquirer.prompt({
        type: 'list',
        name: 'role_id',
        message: 'Please choose a role:',
        choices: roleChoices,
    });

    return role_id;
}

runPrompts();