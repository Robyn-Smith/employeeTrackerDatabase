INSERT INTO department (id, name)
VALUES (1, "HR"),
       (2, "Warehouse"),
       (3, "Customer Service"),
       (4, "Security");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Forklift", 18000, 1),
       (2, "Sales Assistant", 12000, 2),
       (3, "Stock Audit", 13000, 2),
       (4, "Front End", 11000, 3),
       (5, "Checkout Operator", 11000, 3),
       (6, "Self Scan Operator", 12500, 3),
       (7, "Security", 20000, 4);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Robert", "Jefferson", 1, NULL),
       (2, "Tony", "Blands", 1, NULL),
       (3, "Craig", "Smith", 2, NULL),
       (4, "Rose", "Goth", 2, NULL),
       (5, "Tim", "Stake", 2, NULL),
       (6, "Matt", "Brooke", 3, NULL),
       (7, "Linda", "Bloom", 3, NULL),
       (8, "Tracey", "Erricson", 4, NULL),
       (9, "Sam", "Jefferson", 4, NULL);