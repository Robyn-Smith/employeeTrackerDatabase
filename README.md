# employeeTrackerDatabase

## Description

This command-line application was build from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL. This application creates a user friendly interface in the terminal that allows non-developers to easily view and interact with information stored in the database. This type of interface is called **content management systems (CMS)**. 

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation
To install this application please enter the following code in the terminal:
```md
npm i
mysql -u root -p
```
Then when prompted enter your mySQL password. Please ensure you have properly logged into your mySQL before continuing.
```md
source db/schema.sql
source db/seeds.sql
quit;
```
```md
npm run start
```

## Usage
Once the user has typed in 'npm run start' in the terminal, they will be presented with the message 'Please choose an option below:' and the following options:
- 'view employees',
- 'view departments',
- 'view roles',
- 'view employees under chosen manager',
- 'view employees within chosen department',
- 'add new employee',
- 'add new department',
- 'add new role',
- 'update chosen employee role',
- 'update manager',
- 'change the department of chosen role',
- 'remove employee',
- 'remove department',
- 'remove role',
- 'END'
The user then uses the up and down keys in the keyboard to navigate through the options. The user can easily see what options they are selecting as the writing turns blue. When the user has selected their desired action they can press the enter key and follow any other following messages on they keyboard to make their changes to the database. For more support please view the walkthrough video below.

## Walkthrough Video
