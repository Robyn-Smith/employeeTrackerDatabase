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

