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
            "Departments",
            "Roles",
            "Employees"
        ]
    }
];

const updateQuestion = [
    {
        type: "confirm",
        name: "update",
        message: "Would you like to update an employees role?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
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

            // case "VIEW department, role, employee":
            //     askViewQuestion();
            //     break;

            // case "UPDATE employee info":
            //     askUpdateQuestion();
            //     break;

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
    type: "input",
    name: "departmentId",
    message: "Input a department_id."
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

askForRoleQuestion = {
    type: "input",
    name: "role_id",
    message: "What is the employee's role?"
}
askForManagerQuestion = {
    type: "input",
    name: "manager_id",
    message: "Does the employee have a manager?"
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
    inquirer.prompt([
        askForFirstNameQuestion,
        askForLastNameQuestion,
        askForRoleQuestion,
        askForManagerQuestion,
    ]).then(answer => {
        console.log(answer)
        addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
    });
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
        }
    );
}

// TODO: write the add employee function
// TODO: write this function addEmployeeFromData()
// TODO: make sure add employee function works

// makesure to enter 1 employee 
// TODO: implement view functionality
// TODO: make sure the integer lines up with role_id


/////




function askViewQuestion() {
    inquirer.prompt()
}

function askUpateQuestion() {
    inquirer.prompt()
}


askInitialQuestion(); 