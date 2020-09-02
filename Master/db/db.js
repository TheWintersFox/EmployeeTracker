var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: '',
    database: 'employeetracker',
});

connection.query(
    `
    CREATE TABLE IF NOT EXISTS \`employeetracker\`.\`department\` (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
      );
    `
);
connection.query(
    `
    CREATE TABLE IF NOT EXISTS \`employeetracker\`.\`role\` (
        id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id) REFERENCES department(id)
    );
    `
);
connection.query(
    `
    CREATE TABLE IF NOT EXISTS \`employeetracker\`.\`employee\` (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (manager_id) REFERENCES employee(id) 
    );
    `
);

module.exports = connection;