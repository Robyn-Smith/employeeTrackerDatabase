INSERT INTO department (id, name) VALUES (1, 'Education');
INSERT INTO department (id, name) VALUES (2, 'Medicine');
INSERT INTO department (id, name) VALUES (3, 'Culinary');
INSERT INTO department (id, name) VALUES (4, 'Finance');

INSERT INTO role (id, title, salary, department_id) VALUES (1,'Teacher', 30000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2,'Teaching Assistant', 20000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3,'Head Teacher', 60000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (4,'Doctor', 76000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5,'Nurse', 33000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (6,'Chef', 24000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (7,'Accountant', 45000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1,'Robyn', 'Smith', 2, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2,'Adam', 'Smart', 6, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3,'Wren', 'Jones', 1, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4,'Aisha', 'Sian', 3, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5,'Debbie', 'Mason', 5, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6,'Annabelle', 'Harris', 7, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7,'Kirsty', 'Walters', 1, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8,'Richard', 'James', 4, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (9,'Dave', 'Lewis', 6, NULL);