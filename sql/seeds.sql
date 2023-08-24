INSERT INTO department (id, name)
VALUES (1, "Education"),
       (2, "Medicine"),
       (3, "Culinary"),
       (4, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Teacher", 30000, 1),
       (2, "Teaching Assistant", 20000, 1),
       (3, "Head Teacher", 60000, 1),
       (4, "Doctor", 76000, 2),
       (5, "Nurse", 33000, 2),
       (6, "Chef", 24000, 3),
       (7, "Accountant", 45000, 4);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Robyn', 'Smith', 2, NULL),
       (2,'Adam', 'Smart', 6, NULL),
       (3,'Wren', 'Jones', 1, NULL),
       (4,'Aisha', 'Sian', 3, 3),
       (5,'Debbie', 'Mason', 5, NULL),
       (6,'Annabelle', 'Harris', 7, NULL),
       (7,'Kirsty', 'Walters', 1, 1),
       (8,'Richard', 'James', 4, 5),
       (9,'Dave', 'Lewis', 6, NULL);