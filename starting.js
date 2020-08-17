const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection ({
    host: 'localhost',
    port: "8080",
    user: 'root',
    password: '',
    database: 'employees',
});


const addQuestion = [
    {
        type: "list",
        name: "add",
        message: "Would you like to add departments, roles, or employees?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
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

function askInitialQuestion(){
    inquirer.prompt(
        {
            type: "list",
            name: "initialAction",
            message: "Would you like to ADD, VIEW, or UPDATE?",
            choices: [
                "ADD department, role, employee",
                "VIEW department, role, employee",
                "UPDATE employee info"
            ]
        })
        .then(answer => {
            switch (answer.intialAction) {
                case "ADD department, role, employee":
                    askAddQuestion();
                    break;
                
                case "VIEW department, role, employee":
                    askViewQuestion();
                    break;
                
                case "UPDATE employee info":
                    askUpdateQuestion();
                    break;

                case "EXIT":
                    connection.end();
                    break;
            }
        });
    }    


function askAddQuestion () {
    inquirer.prompt (addQuestion, answers) {
        
    }
}



function askViewQuestion () {
    inquirer.prompt ()
}

function askUpateQuestion () {
    inquirer.prompt ()
}

askInitialQuestion(); 