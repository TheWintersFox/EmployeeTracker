const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./Master/db/db');

const addQuestion = [
    {
        type: "list",
        name: "add",
        message: "Would you like to add a department, role, or employee?",
        choices: [
            "Department",
            "Role",
            "Employee"
        ]
    }
];

const viewQuestion = [
    {
        type: "list",
        name: "view",
        message: "Which would you like to view departments, roles, or employees?",
        choices: [
            "Department",
            "Role",
            "Employee"
        ]
    }
];

//
function askInitialQuestion() {
    inquirer.prompt(
        {
            type: "list",
            name: "initialAction",
            message: "Would you like to ADD, VIEW, or UPDATE?",
            choices: [
                'ADD department, role, employee',
                'VIEW department, role, employee',
                'UPDATE employee info'
            ]
        }
    ).then(answer => {
        switch (answer.initialAction) {
            case 'ADD department, role, employee':
                console.error("Go into the then block");
                askAddQuestion();
                break;

            case "VIEW department, role, employee":
                askViewQuestion();
                break;

            case "UPDATE employee info":
                askUpdateQuestion();
                break;

            case "EXIT":
                db.end();
                break;
        }
    });
}

// case if the user chooses to add a department, role or employee
function askAddQuestion() {
    inquirer.prompt(
        addQuestion
    )
        .then(answer => {
            switch (answer.add) {
                case "Department":
                    addDepartmentFromData();
                    break;

                case "Role":
                    addRoleFromData();
                    break;

                case "Employee":
                    addEmployeeFromData();
                    break;
            }
        });
}

function askViewQuestion() {
    inquirer.prompt(
        viewQuestion
    )
        .then(answer => {
            switch (answer.view) {
                case "Department":
                    viewDepartmentFromData();
                    break;

                case "Role":
                    viewRoleFromData();
                    break;

                case "Employee":
                    viewEmployeeFromData();
                    break;
            }
        });
}

const askForNameQuestion = {
    type: "input",
    name: "name",
    message: "Choose a name."
}
const askForTitleQuestion = {
    type: "input",
    name: "title",
    message: "Choose a title."
}
const askForSalaryQuestion = {
    type: "input",
    name: "salary",
    message: "Choose a salary."
}
const askForDepartmentIdQuestion = {
    type: "list",
    name: "departmentId",
    message: "Which department is the new role in?",
    choices: ['Sales', 'Engineering', 'Finance', 'Legal']
}

const askForFirstNameQuestion = {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
}
const askForLastNameQuestion = {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
}

const askForRoleQuestion = {
    type: "list",
    name: "role_id",
    message: "What department is the employee in",
    choices: ['Sales', 'Engineering', 'Finance', 'Legal']
}
const askForManagerQuestion = {
    type: "list",
    name: "manager_id",
    message: "Does the employee have a manager, if so enter 1 for Mike Chan, enter 3 for Kevin Tupik, enter 5 for Malia Brown, enter 7 for Tom Allen",
    choices: [1, 3, 5, 7]
}

//do something
function addDepartmentFromData() {
    inquirer.prompt([
        askForNameQuestion
    ]).then(answer => {
        addDepartment(answer.name);
    });
}
//do something
function addRoleFromData() {
    inquirer.prompt([
        askForTitleQuestion,
        askForSalaryQuestion,
        askForDepartmentIdQuestion
    ]).then(answer => {
        addRole(answer.title, answer.salary, answer.departmentId);
    })
}

//do something
function addEmployeeFromData() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;

        const roles = res.map(role => { 
            return { name: role.title, value: role.id };
        });

        db.query('SELECT * FROM employee', (err, res) => {
            const managers = res.map(manager => {
                return { name: manager.first_name, value: manager.id }
            });
            managers.unshift({ name: 'None', value: null });

            inquirer.prompt([
                askForFirstNameQuestion,
                askForLastNameQuestion,
                { ...askForRoleQuestion, choices: roles },
                { ...askForManagerQuestion, choices: managers},
            ]).then(answer => {
                console.log(answer)
                addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
            });
        });

    })
}

function addDepartment(name) {
    const sql = "INSERT INTO `department` (name) VALUES (?)";
    db.query(
        sql,
        [name],
        err => {
            if (err) {
                console.log(err);

            }
            askInitialQuestion();
        }
    );
}

function addRole(title, salary, departmentId) {
    const sql = "INSERT INTO `role` (title, salary, department_id) VALUES (?, ?, ?)";
    db.query(
        sql,
        [title, salary, departmentId],
        err => {
            if (err) {
                if (err.errno === 1452) {
                    console.log("You need to use a department id that is valid.");
                } else {
                    console.log(err);
                }

            }
            askInitialQuestion();
        }
    );
}


function addEmployee(first_name, last_name, role_id, manager_id) {
    const sql = "INSERT INTO `employee` (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    db.query(
        sql,
        [first_name, last_name, role_id, manager_id],
        err => {
            if (err) {
                console.log(err);
            } else {
                console.log("You successfully added an Employee to the database!")
            }
            askInitialQuestion();
        }
    );
}
// View Departments
function viewDepartmentFromData() {
    console.log("View Departments:");
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        askInitialQuestion();
    })
}

// View Roles
function viewRoleFromData() {
    console.log("View Roles:")
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        askInitialQuestion();
    })
}

// View Employees
function viewEmployeeFromData() {
    console.log("View Employees:")
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        askInitialQuestion();
    })
}

function askUpdateQuestion() {
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.log('res', res)

        inquirer.prompt([
            {
                type: "list",
                question: 'Which employee do you want to update?',
                name: 'employeeId',
                choices: res.map(employee => { 
                    return { name: employee.first_name, value: employee.id };
                }),
            },
            {
                type: "list",
                question: 'Which field do you want to update?',
                name: 'colName',
                choices: ['first_name', 'last_name'],
            },
            {
                question: 'What value do you want to update to?',
                type: "input",
                name: 'colValue'
            }
        ]).then((answer) => {
            db.query(
                "UPDATE employee SET ??=? WHERE id = ?",
                [answer.colName, answer.colValue, answer.employeeId],
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                    askInitialQuestion();
                }
            );
        });
    });
}


askInitialQuestion(); 