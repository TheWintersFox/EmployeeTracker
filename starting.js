var inquirer = require("inquirer");



const initialQuestion = [
    {
        type: "list",
        name: "initialAction",
        message: "Would you like to ADD, VIEW, or UPDATE?",
        choices: [
            "ADD department, role, employee",
            "VIEW department, role, employee",
            "UPDATE employee info"
        ]
    }
];

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
    inquirer.prompt(initialQuestion, function( answers ) {

        if (answers.initialAction === "ADD") {
            askAddQuestion();
        } else if ( answers.initialAction === "VIEW") {
            askViewQuestion();
        }   else if (answers.initialAction === "UPDATE") {
            askUpateQuestion();
        }
    });
}


function askAddQuestion () {
    inquirer.prompt (addQuestion)
}

function askViewQuestion () {
    inquirer.prompt ()
}

function askUpateQuestion () {
    inquirer.prompt ()
}

askInitialQuestion(); 