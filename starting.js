var inquirer = require("inquirer");



const initialQuestion = [
    {
        type: "list",
        name: "initialAction",
        message: "Would you like to ADD, VIEW, or UPDATE?",
        choices: [
            "ADD",
            "VIEW",
            "UPDATE"
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
    inquirer.prompt ()
}



askInitialQuestion(); 